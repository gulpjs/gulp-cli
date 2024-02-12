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

describe('config: theme.* & msgs.*', function() {

  it('Should change help.usage with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'help/usage');
    var expected = fs.readFileSync(path.join(expectedDir, 'help/usage/help.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('--help'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should change help.flags.* with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'help/flags');
    var expected = fs.readFileSync(path.join(expectedDir, 'help/flags/help.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('--help'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should change tasks.description with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasks/description');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = '** ' + gulpfile + ' **\n' +
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

  it('Should remove task.gulpfile line output with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasks/description/remove');
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

  it('Should change tasks.topTask with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasks/topTask');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Tasks for ' + gulpfile + '\n' +
      '├─┬ **default**  This is default task\n' +
      '│ │ --ghi        …is a flag for default task\n' +
      '│ └─┬ <series>\n' +
      '│   ├── taskA\n' +
      '│   └── taskB\n' +
      '├── **taskA**    This is task A\n' +
      '│   --abc        …is a flag for task A\n' +
      '└── **taskB**    This is task B\n' +
      '    --def        …is a flag for task B\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should change tasks.option with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasks/option');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Tasks for ' + gulpfile + '\n' +
      '├─┬ default    This is default task\n' +
      '│ │ **--ghi**  » is a flag for default task\n' +
      '│ └─┬ <series>\n' +
      '│   ├── taskA\n' +
      '│   └── taskB\n' +
      '├── taskA      This is task A\n' +
      '│   **--abc**  » is a flag for task A\n' +
      '└── taskB      This is task B\n' +
      '    **--def**  » is a flag for task B\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should change tasks.childTask with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasks/childTask');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Tasks for ' + gulpfile + '\n' +
      '├─┬ default  This is default task\n' +
      '│ │ --ghi    …is a flag for default task\n' +
      '│ └─┬ **<series>**\n' +
      '│   ├── **taskA**\n' +
      '│   └── **taskB**\n' +
      '├── taskA    This is task A\n' +
      '│   --abc    …is a flag for task A\n' +
      '└── taskB    This is task B\n' +
      '    --def    …is a flag for task B\n';

    var opts = { cwd: cwd };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should change tasksJson.gulpfile with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'tasksJson/description');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = JSON.stringify({
      label: '** ' + gulpfile + ' **',
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

  it('Should change info.preloadBefore with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/preloadBefore');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'PRELOADING **./preload**\n' +
      'Preloaded external module: ./preload\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp('--preload ./preload'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.preloadSuccess with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/preloadSuccess');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Preloading external module: ./preload\n' +
      'PRELOADDED **./preload**\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp('--preload ./preload'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.loaderSuccess with .gulp.*', function(done) {
    this.timeout(0);

    var cwd = path.join(baseDir, 'info/loaderSuccess');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.babel.js'));
    var expected = 'LOADED **@babel/register**\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp('-f gulpfile.babel.js'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.respawn with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/respawn');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'RESPAWN BY **--lazy**\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp('--lazy'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.version with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/version');
    var expected = /gulp-cli @@v\d.\d.\d@@ | gulp @@v\d.\d.\d@@\n/;

    var opts = { cwd: cwd };
    exec(gulp('--version'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toMatch(expected);
      done(err);
    }
  });

  it('Should change info.cwdChanged with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/cwdChanged');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'CHANGE CWD TO  **' + tildify(cwd) + '**\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: baseDir };
    exec(gulp('--cwd ' + cwd), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.usingGulpfile with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/usingGulpfile');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'USING GULPFILE **' + gulpfile + '**\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.taskStart with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/taskStart');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Using gulpfile ' + gulpfile + '\n' +
      'START **default**\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change info.taskStop with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'info/taskStop');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'STOP **default**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(expected);
      done(err);
    }
  });

  it('Should change warn.preloadFailure with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'warn/preloadFailure');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expected = 'Preloading external module: null-module\n' +
      'FAILED TO PRELOAD **null-module**\n' +
      'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n' +
      'Finished \'default\' after ?\n';

    var opts = { cwd: cwd };
    exec(gulp('--preload null-module'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseLapse(eraseTime(stdout))).toEqual(expected);
      done(err);
    }
  });

  it('Should change warn.loaderFailure with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'warn/loaderFailure');
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

  it('Should change warn.taskNotComplete with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'warn/taskNotComplete');
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

  it('Should change error.failToParseCliOpts with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/failToParseCliOpts');
    var expected = fs.readFileSync(path.join(expectedDir, 'error/failToParseCliOpts/help.txt'), 'utf8');

    var opts = { cwd: cwd };
    exec(gulp('-f'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(stderr).toEqual(expected);
      done();
    }
  });

  it('Should change error.gulpNotFound with .gulp.*', function(done) {
    var dir = path.join(baseDir, 'error/gulpNotFound');
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

  it('Should change error.nodeModulesNotFound with .gulp.*', function(done) {
    var dir = path.join(baseDir, 'error/nodeModulesNotFound');
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
        expect(stderr).toEqual(expected);
        done();
      } finally {
        fs.unlinkSync(path.join(cwd, '.gulp.js'));
        fs.unlinkSync(path.join(cwd, 'package.json'));
      }
    }
  });

  it('Should change error.gulpfileNotFound with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/gulpfileNotFound');
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

  it('Should change error.badGulpVersion with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/badGulpVersion');
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

  it('Should change error.taskError with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/taskError');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expectedStdout = 'Using gulpfile ' + gulpfile + '\n' +
      'Starting \'default\'...\n';
    var expectedStderr = 'TASK ERROR: **default**\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(eraseTime(stderr)).toEqual(expectedStderr);
      expect(eraseTime(stdout)).toEqual(expectedStdout);
      done();
    }
  });

  it('Should change error.taskNotFound with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/taskNotFound');
    var gulpfile = tildify(path.join(cwd, 'gulpfile.js'));
    var expectedStdout = 'Using gulpfile ' + gulpfile + '\n';
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

  it('Should change error.failToRun with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/failToRun');
    var expected = 'FAIL TO RUN\n';

    var opts = { cwd: cwd };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual(expected);
      expect(stdout).toEqual('');
      done();
    }
  });

  it('Should change error.noCompletionType with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/noCompletionType');
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

  it('Should change error.unknownCompletionType with .gulp.*', function(done) {
    var cwd = path.join(baseDir, 'error/unknownCompletionType');
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
