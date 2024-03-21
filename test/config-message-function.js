'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var os = require('os');

var tildify = require('../lib/shared/tildify');

var baseDir = path.join(__dirname, 'fixtures/config/theming');
var expectedDir = path.join(__dirname, 'expected/config/theming');

var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var gulp = require('./tool/gulp-cmd');

describe('config: message function', function() {

  it('can change USAGE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'USAGE');
    var expected = fs.readFileSync(path.join(expectedDir, 'usage.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('--help'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('can change flag descriptions with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'flags');
    var expected = fs.readFileSync(path.join(expectedDir, 'flags.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('--help'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('can change DESCRIPTION with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'DESCRIPTION');
    var expected = '**DESCRIPTION**\n' +
      '└── default\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('can remove DESCRIPTION line output with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'DESCRIPTION/remove');
    var expected = '└── default\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('can change DESCRIPTION for tasks-json with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'DESCRIPTION');
    var expected = JSON.stringify({
      label: '**DESCRIPTION**',
      nodes: [{
        label: 'default',
        type: 'task',
        nodes: [],
      }],
    }) + '\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks-json'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('can change PRELOAD_BEFORE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'PRELOAD_BEFORE');
    var expected = 'PRELOADING **./preload**!\n';

    var opts = { cwd: cwd };
    exec(gulp('--preload ./preload'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change PRELOAD_SUCCESS with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'PRELOAD_SUCCESS');
    var expected = 'PRELOADED **./preload**!\n';

    var opts = { cwd: cwd };
    exec(gulp('--preload ./preload'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change LOADER_SUCCESS with .gulp.*', function(done) {
    this.timeout(0);

    var cwd = path.join(baseDir, 'LOADER_SUCCESS');
    var expected = 'LOADED **@babel/register**!\n';

    var opts = { cwd: cwd };
    exec(gulp('-f gulpfile.babel.js'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change NODE_FLAGS with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'NODE_FLAGS');
    var expected = 'RESPAWNED BY **--lazy**!\n';

    var opts = { cwd: cwd };
    exec(gulp('--lazy'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change RESPAWNED with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'RESPAWNED');
    var expected = 'RESPAWN!\n';

    var opts = { cwd: cwd };
    exec(gulp('--lazy'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change CWD_CHANGED with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'CWD_CHANGED');
    var expected = 'CHANGE CWD TO **' + cwd + '**\n';

    var opts = { cwd: baseDir };
    exec(gulp('--cwd ' + cwd), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change GULPFILE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'GULPFILE');
    var expected = 'USING GULPFILE **abcxyz**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change TASK_START with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_START');
    var expected = 'START **default**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change TASK_STOP with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_STOP');
    var expected = 'STOP **default**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(expected);
      done(err);
    }
  });

  it('can change PRELOAD_FAILURE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'PRELOAD_FAILURE');
    var expected = 'FAILED TO PRELOAD **null-module**\n'

    var opts = { cwd: cwd };
    exec(gulp('--preload null-module'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('can change LOADER_FAILURE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'LOADER_FAILURE');
    var expected = 'FAIL TO LOAD **coffeescript/register**\n';

    var opts = { cwd: cwd };
    exec(gulp('-f gulpfile.coffee'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).not.toEqual('');
      expect(eraseTime(stdout)).toEqual(expected);
      done();
    }
  });

  it('can change TASK_SYNC with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_SYNC');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'TASK **default** DID NOT COMPLETE\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(expected);
      done();
    }
  });

  it('can change ARGV_ERROR with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'ARGV_ERROR');
    var expected = fs.readFileSync(path.join(expectedDir, 'bad-flag.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('-f'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(stderr).toEqual(expected);
      done();
    }
  });

  it('can change MISSING_GULP with .gulp.*', function(done) {
    var dir = path.join(baseDir, 'MISSING_GULP');
    var cwd = os.tmpdir();
    fs.copyFileSync(path.join(dir, '.gulp.js'), path.join(cwd, '.gulp.js'));

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    if (os.platform() === 'darwin') {
      cwd = path.join('/private', cwd);
    }
    var expected = 'GULP NOT FOUND IN **' + cwd + '**\n';

    function cb(err, stdout, stderr) {
      try {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(stderr).toEqual(expected);
        done();
      } finally {
        fs.unlinkSync(path.join(cwd, '.gulp.js'));
      }
    }
  });

  it('can change MISSING_NODE_MODULES with .gulp.*', function(done) {
    var dir = path.join(baseDir, 'MISSING_NODE_MODULES');
    var cwd = os.tmpdir();
    fs.copyFileSync(path.join(dir, '.gulp.js'), path.join(cwd, '.gulp.js'));
    fs.copyFileSync(path.join(dir, 'package.json'), path.join(cwd, 'package.json'));
    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    if (os.platform() === 'darwin') {
      cwd = path.join('/private', cwd);
    }
    var expected = 'LOCAL MODULE NOT FOUND **' + cwd + '**\n';

    function cb(err, stdout, stderr) {
      try {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual(expected);
        done();
      } finally {
        fs.unlinkSync(path.join(cwd, '.gulp.js'));
        fs.unlinkSync(path.join(cwd, 'package.json'));
      }
    }
  });

  it('can change MISSING_GULPFILE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'MISSING_GULPFILE');
    var expected = 'NO GULPFILE\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(eraseTime(stderr)).toEqual(expected);
      done();
    }
  });

  it('can change UNSUPPORTED_GULP_VERSION with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'UNSUPPORTED_GULP_VERSION');
    var expected = 'BAD GULP VERSION **1.2.3**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(eraseTime(stderr)).toEqual(expected);
      done();
    }
  });

  it('can change TASK_FAILURE with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_FAILURE');
    var expectedStderr = 'TASK FAILURE: **default**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(stderr).toEqual(expectedStderr);
      done();
    }
  });

  it('can change TASK_ERROR with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_ERROR');
    var expectedStderr = '**TASK ERROR**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(stderr).toEqual(expectedStderr);
      done();
    }
  });

  it('can change TASK_MISSING with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'TASK_MISSING');
    var expectedStdout = 'Using gulpfile!\n';
    var expectedStderr = 'TASK IS NOT FOUND: **defaults** SIMILAR ##default##';

    var opts = { cwd: cwd };
    exec(gulp('defaults'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(eraseTime(stderr)).toMatch(expectedStderr);
      expect(eraseTime(stdout)).toEqual(expectedStdout);
      done();
    }
  });

  it('can change EXEC_ERROR with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'EXEC_ERROR');
    var expected = 'FAIL TO RUN\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(eraseTime(stderr)).toEqual(expected);
      expect(stdout).toEqual('');
      done();
    }
  });

  it('can change COMPLETION_TYPE_MISSING with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'COMPLETION_TYPE_MISSING');
    var expected = 'NO COMPLETION TYPE';

    var opts = { cwd: cwd };
    exec(gulp('--completion'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toMatch(expected);
      expect(stdout).toEqual('');
      done();
    }
  });

  it('can change COMPLETION_TYPE_UNKNOWN with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'COMPLETION_TYPE_UNKNOWN');
    var expected = 'GULP COMPLETION TYPE **xxx** IS NOT FOUND\n';

    var opts = { cwd: cwd };
    exec(gulp('--completion=xxx'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done();
    }
  });
});
