#!/usr/bin/env node

'use strict';
var path = require('path');
var gutil = require('gulp-util');
var chalk = require('chalk');
var nomnom = require('nomnom');
var semver = require('semver');
var Liftoff = require('liftoff');
var tildify = require('tildify');
var interpret = require('interpret');
var v8flags = require('v8flags');
var exit = require('./lib/exit');
var cliOptions = require('./lib/cliOptions');
var completion = require('./lib/completion');
var verifyDeps = require('./lib/verifyDependencies');
var cliVersion = require('./package.json').version;
var getBlacklist = require('./lib/getBlacklist');

// logging functions
var logVerify = require('./lib/log/verify');
var logBlacklistError = require('./lib/log/blacklistError');

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
var tasks = opts._;
var toRun = tasks.length ? tasks : ['default'];

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

  if (semver.satisfies(env.modulePackage.version, '^3')) {
    return gulp3(env);
  }

  if (semver.satisfies(env.modulePackage.version, '^4')) {
    return gulp4(env);
  }
}

function gulp3(env){
  var logTasks = require('./lib/3/logTasks');
  var logEvents = require('./lib/3/logEvents');
  var logTasksSimple = require('./lib/3/logTasksSimple');

  // this is what actually loads up the gulpfile
  require(env.configPath);
  gutil.log('Using gulpfile', chalk.magenta(tildify(env.configPath)));

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);

  process.nextTick(function () {
    if (opts.tasksSimple) {
      return logTasksSimple(env, gulpInst);
    }
    if (opts.tasks) {
      return logTasks(env, gulpInst);
    }
    gulpInst.start.apply(gulpInst, toRun);
  });
}

function gulp4(env){
  var logTasks = require('./lib/log/tasks');
  var logEvents = require('./lib/log/events');
  var logTasksSimple = require('./lib/log/tasksSimple');

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);

  // this is what actually loads up the gulpfile
  require(env.configPath);

  process.nextTick(function () {
    if (opts.tasksSimple) {
      return logTasksSimple(gulpInst.tree());
    }
    if (opts.tasks) {
      var tree = {
        label: 'Tasks for ' + chalk.magenta(tildify(env.configPath)),
        nodes: gulpInst.tree({ deep: true })
      };
      return logTasks(tree);
    }
    if (opts.tasksJson) {
      return console.log(
        JSON.stringify(gulpInst.tree({ deep: true }), null, 2)
      );
    }
    try {
      gutil.log('Using gulpfile', chalk.magenta(tildify(env.configPath)));
      // TODO: do we care about the error/result from calling this?
      gulpInst.parallel(toRun)();
    } catch (err) {
      gutil.log(chalk.red(err.message));
      gutil.log(
        'Please check the documentation for proper gulpfile formatting'
      );
      exit(1);
    }
  });
}
