'use strict';

var fs = require('fs');
var path = require('path');
var log = require('gulplog');
var chalk = require('chalk');
var Liftoff = require('liftoff');
var interpret = require('interpret');
var v8flags = require('v8flags');
var findRange = require('semver-greatest-satisfied-range');

var exit = require('./lib/shared/exit');
var tildify = require('./lib/shared/tildify');
var makeTitle = require('./lib/shared/make-title');
var parser = require('./lib/shared/options/parser');
var makeHelp = require('./lib/shared/options/make-help');
var completion = require('./lib/shared/completion');
var cliVersion = require('./package.json').version;
var toConsole = require('./lib/shared/log/to-console');

var mergeProjectAndUserHomeConfigs = require('./lib/shared/config/merge-configs');
var overrideEnvByConfigAndCliOpts = require('./lib/shared/config/env-config');
var messages = require('./messages');

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
  configFiles: {
    project: [
      {
        name: '.gulp',
        path: '.',
        extensions: interpret.extensions,
        findUp: true,
      },
    ],
    userHome: [
      {
        name: '.gulp',
        path: '~',
        extensions: interpret.extensions,
      },
    ],
  },
});

var opts = {};
var optsErr;
try {
  opts = parser.argv;
} catch (e) {
  optsErr = e;
}

cli.on('preload:before', function(name) {
  log.info(messages.PRELOAD_BEFORE, name);
});

cli.on('preload:success', function(name) {
  log.info(messages.PRELOAD_SUCCESS, name);
});

cli.on('preload:failure', function(name, error) {
  log.warn(messages.PRELOAD_FAILURE, name);
  if (error) {
    log.warn(messages.PRELOAD_ERROR, error);
  }
});

cli.on('loader:success', function(name) {
  // This is needed because interpret needs to stub the .mjs extension
  // Without the .mjs require hook, rechoir blows up
  // However, we don't want to show the mjs-stub loader in the logs
  /* istanbul ignore else */
  if (path.basename(name, '.js') !== 'mjs-stub') {
    log.info(messages.LOADER_SUCCESS, name);
  }
});

cli.on('loader:failure', function(name, error) {
  log.warn(messages.LOADER_FAILURE, name);
  if (error) {
    log.warn(messages.LOADER_ERROR, error);
  }
});

cli.on('respawn', function(flags, child) {
  log.info(messages.NODE_FLAGS, flags);
  log.info(messages.RESPAWNED, child.pid);
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

function onPrepare(env) {
  var cfg = mergeProjectAndUserHomeConfigs(env);
  env = overrideEnvByConfigAndCliOpts(env, cfg, opts);

  // Set up event listeners for logging after configuring.
  toConsole(log, env.config.flags);

  cli.execute(env, env.nodeFlags, onExecute);
}

// The actual logic
function onExecute(env) {
  // This translates the --continue flag in gulp
  // To the settle env variable for undertaker
  // We use the process.env so the user's gulpfile
  // Can know about the flag
  if (env.config.flags.continue) {
    process.env.UNDERTAKER_SETTLE = 'true';
  }

  // if (optsErr) {
  //   log.error(msgs.error.failToParseCliOpts, optsErr.message);
  //   makeHelp(parser).showHelp(console.error);
  //   exit(1);
  // }
  // if (env.config.flags.help) {
  //   makeHelp(parser).showHelp(console.log);
  //   exit(0);
  // }

  // Anything that needs to print outside of the logging mechanism should use console.log
  if (env.config.flags.version) {
    console.log('CLI version:', cliVersion);
    console.log('Local version:', env.modulePackage.version || 'Unknown');
    exit(0);
  }

  if (!env.modulePath) {
    // var missingNodeModules =
    //   fs.existsSync(path.join(env.cwd, 'package.json'))
    //   && !fs.existsSync(path.join(env.cwd, 'node_modules'));

    // var hasYarn = fs.existsSync(path.join(env.cwd, 'yarn.lock'));
    // var hasNpm = !hasYarn;

    // if (missingNodeModules) {
    //   log.error(msgs.error.nodeModulesNotFound, tildify(env.cwd), hasYarn, hasNpm);
    // } else {
    //   log.error(msgs.error.gulpNotFound, tildify(env.cwd), hasYarn, hasNpm);
    // }
    exit(1);
  }

  if (!env.configPath) {
    log.error(messages.GULPFILE_NOT_FOUND);
    exit(1);
  }

  // Chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    log.info(messages.CWD_CHANGED, tildify(env.cwd));
  }

  // Find the correct CLI version to run
  var range = findRange(env.modulePackage.version, ranges);

  if (!range) {
    log.error(messages.UNSUPPORTED_GULP_VERSION, env.modulePackage.version);
    exit(1);
  }

  // Load and execute the CLI version
  var versionedDir = path.join(__dirname, '/lib/versioned/', range, '/');
  require(versionedDir)(env);
}
