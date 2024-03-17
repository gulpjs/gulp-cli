'use strict';

var fs = require('fs');
var path = require('path');

var log = require('gulplog');
var yargs = require('yargs');
var Liftoff = require('liftoff');
var interpret = require('interpret');
var v8flags = require('v8flags');
var findRange = require('semver-greatest-satisfied-range');
var chalk = require('chalk');

var exit = require('./lib/shared/exit');
var tildify = require('./lib/shared/tildify');
var arrayFind = require('./lib/shared/array-find');
var makeTitle = require('./lib/shared/make-title');
var cliOptions = require('./lib/shared/options/cli-options');
var completion = require('./lib/shared/completion');
var cliVersion = require('./package.json').version;
var toConsole = require('./lib/shared/log/to-console');
var mergeCliOpts = require('./lib/shared/config/cli-flags');

// Get supported ranges
var ranges = fs.readdirSync(path.join(__dirname, '/lib/versioned/'));

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'gulp',
  processTitle: makeTitle('gulp', process.argv.slice(2)),
  completions: completion,
  extensions: interpret.jsVariants,
  v8flags: v8flags,
  configFiles: [
    {
      name: '.gulp',
      path: '.',
      extensions: interpret.jsVariants,
      findUp: true,
    },
    {
      name: '.gulp',
      path: '~',
      extensions: interpret.jsVariants,
    },
  ],
});

var usage =
  '\n' + chalk.bold('Usage:') +
  ' gulp ' + chalk.blue('[options]') + ' tasks';

var parser = yargs
  .help(false)
  .version(false)
  .detectLocale(false)
  .usage(usage)
  .options(cliOptions);

var opts = parser.parse();

// Set up event listeners for logging temporarily.
toConsole(log, opts);

cli.on('preload:before', function(name) {
  log.info('Preloading external module:', chalk.magenta(name));
});

cli.on('preload:success', function(name) {
  log.info('Preloaded external module:', chalk.magenta(name));
});

cli.on('preload:failure', function(name, error) {
  log.warn(
    chalk.yellow('Failed to preload external module:'),
    chalk.magenta(name)
  );
  /* istanbul ignore else */
  if (error) {
    log.warn(chalk.yellow(error.toString()));
  }
});

cli.on('loader:success', function(name) {
  // This is needed because interpret needs to stub the .mjs extension
  // Without the .mjs require hook, rechoir blows up
  // However, we don't want to show the mjs-stub loader in the logs
  /* istanbul ignore else */
  if (path.basename(name, '.js') !== 'mjs-stub') {
    log.info('Loaded external module:', chalk.magenta(name));
  }
});

cli.on('loader:failure', function(name, error) {
  log.warn(
    chalk.yellow('Failed to load external module:'),
    chalk.magenta(name)
  );
  /* istanbul ignore else */
  if (error) {
    log.warn(chalk.yellow(error.toString()));
  }
});

cli.on('respawn', function(flags, child) {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  log.info('Node flags detected:', nodeFlags);
  log.info('Respawned to PID:', pid);
});

function run() {
  cli.prepare({
    cwd: opts.cwd,
    configPath: opts.gulpfile,
    preload: opts.preload,
    completion: opts.completion,
  }, onPrepare);
}

module.exports = run;

function isDefined(cfg) {
  return cfg != null;
}

function onPrepare(env) {
  // We only use the first config found, which is a departure from
  // the previous implementation that merged with the home
  var cfg = arrayFind(env.config, isDefined);
  var flags = mergeCliOpts(opts, cfg);

  // Set up event listeners for logging after configuring.
  toConsole(log, flags);

  cli.execute(env, cfg.nodeFlags, function (env) {
    onExecute(env, cfg, flags);
  });
}

// The actual logic
function onExecute(env, cfg, flags) {
  // This translates the --continue flag in gulp
  // To the settle env variable for undertaker
  // We use the process.env so the user's gulpfile
  // Can know about the flag
  if (flags.continue) {
    process.env.UNDERTAKER_SETTLE = 'true';
  }

  if (flags.help) {
    parser.showHelp(console.log);
    exit(0);
  }

  // Anything that needs to print outside of the logging mechanism should use console.log
  if (flags.version) {
    console.log('CLI version:', cliVersion);
    console.log('Local version:', env.modulePackage.version || 'Unknown');
    exit(0);
  }

  if (!env.modulePath) {
    /* istanbul ignore next */
    var missingNodeModules =
      fs.existsSync(path.join(env.cwd, 'package.json'))
      && !fs.existsSync(path.join(env.cwd, 'node_modules'));

    /* istanbul ignore next */
    var missingGulpMessage =
      missingNodeModules
        ? 'Local modules not found in'
        : 'Local gulp not found in';
    log.error(
      chalk.red(missingGulpMessage),
      chalk.magenta(tildify(env.cwd))
    );
    var hasYarn = fs.existsSync(path.join(env.cwd, 'yarn.lock'));
    /* istanbul ignore next */
    var installCommand =
      missingNodeModules
        ? hasYarn
          ? 'yarn install'
          : 'npm install'
        : hasYarn
          ? 'yarn add gulp'
        : 'npm install gulp';
    log.error(chalk.red('Try running: ' + installCommand));
    exit(1);
  }

  if (!env.configPath) {
    log.error(chalk.red('No gulpfile found'));
    exit(1);
  }

  // Chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    log.info(
      'Working directory changed to',
      chalk.magenta(tildify(env.cwd))
    );
  }

  // Find the correct CLI version to run
  var range = findRange(env.modulePackage.version, ranges);

  if (!range) {
    log.error(
      chalk.red('Unsupported gulp version', env.modulePackage.version)
    );
    exit(1);
  }

  // Load and execute the CLI version
  var versionedDir = path.join(__dirname, '/lib/versioned/', range, '/');
  require(versionedDir)(env, cfg, flags);
}
