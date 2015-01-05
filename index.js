#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var chalk = require('chalk');
var nomnom = require('nomnom');
var semver = require('semver');
var Liftoff = require('liftoff');
var tildify = require('tildify');
var interpret = require('interpret');
var v8flags = require('v8flags');
var findRange = require('semver-greatest-satisfied-range');
var exit = require('./lib/shared/exit');
var cliOptions = require('./lib/shared/cliOptions');
var completion = require('./lib/shared/completion');
var verifyDeps = require('./lib/shared/verifyDependencies');
var cliVersion = require('./package.json').version;
var getBlacklist = require('./lib/shared/getBlacklist');

// logging functions
var logVerify = require('./lib/shared/log/verify');
var logBlacklistError = require('./lib/shared/log/blacklistError');

// get supported ranges
var ranges = fs.readdirSync(__dirname + '/lib/versioned/');

// set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'gulp',
  completions: completion,
  extensions: interpret.jsVariants,
  nodeFlags: v8flags.fetch()
});

var opts = nomnom
  .script('gulp')
  .options(cliOptions)
  .parse();

// this is a hold-over until we have a better logging system
// with log levels
var shouldLog = !opts.silent && !opts.tasksSimple;

if (!shouldLog) {
  gutil.log = function(){};
}

cli.on('require', function (name) {
  gutil.log('Requiring external module', chalk.magenta(name));
});

cli.on('requireFail', function (name) {
  gutil.log(chalk.red('Failed to load external module'), chalk.magenta(name));
});

cli.on('respawn', function (flags, child) {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  gutil.log('Node flags detected:', nodeFlags);
  gutil.log('Respawned to PID:', pid);
});

function run() {
  cli.launch({
    cwd: opts.cwd,
    configPath: opts.gulpfile,
    require: opts.require,
    completion: opts.completion
  }, handleArguments);
}

module.exports = run;

// the actual logic
function handleArguments(env) {
  if (opts.version) {
    gutil.log('CLI version', cliVersion);
    if (env.modulePackage && typeof env.modulePackage.version !== 'undefined') {
      gutil.log('Local version', env.modulePackage.version);
    }
    exit(0);
  }

  if (opts.verify) {
    var pkgPath = opts.verify !== true ? opts.verify : 'package.json';
    if (path.resolve(pkgPath) !== path.normalize(pkgPath)) {
      pkgPath = path.join(env.configBase, pkgPath);
    }
    gutil.log('Verifying plugins in ' + pkgPath);
    return getBlacklist(function (err, blacklist) {
      if (err) {
        return logBlacklistError(err);
      }

      var blacklisted = verifyDeps(require(pkgPath), blacklist);

      logVerify(blacklisted);
    });
  }

  if (!env.modulePath) {
    gutil.log(
      chalk.red('Local gulp not found in'),
      chalk.magenta(tildify(env.cwd))
    );
    gutil.log(chalk.red('Try running: npm install gulp'));
    exit(1);
  }

  if (!env.configPath) {
    gutil.log(chalk.red('No gulpfile found'));
    exit(1);
  }

  // check for semver difference between cli and local installation
  // TODO: remove when we support all
  if (semver.gt(cliVersion, env.modulePackage.version)) {
    gutil.log(chalk.red('Warning: gulp version mismatch:'));
    gutil.log(chalk.red('Global gulp is', cliVersion));
    gutil.log(chalk.red('Local gulp is', env.modulePackage.version));
  }

  // chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    gutil.log(
      'Working directory changed to',
      chalk.magenta(tildify(env.cwd))
    );
  }

  // find the correct CLI version to run
  var range = findRange(env.modulePackage.version, ranges);

  // load and execute the CLI version
  require(path.join(__dirname, '/lib/versioned/', range, '/'))(opts, env);
}
