'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var tildify = require('../lib/shared/tildify');

var headLines = require('gulp-test-tools').headLines;
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures', 'config', 'logs');
var expectedDir = path.join(__dirname, 'expected', 'config', 'logs');

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

describe('config: log.messages/log.theme', function() {

  it('Should configure log message and theme of help flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--help')
      .run(cb);

    var str = fs.readFileSync(path.join(expectedDir, 'help.txt'), 'utf-8');

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(str);
      done(err);
    }
  });

  it('Should configure log message and theme of tasks flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--tasks')
      .run(cb);

    var str = fs.readFileSync(path.join(expectedDir, 'tasks.txt'), 'utf-8');

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(skipLines(stdout, 1)).toEqual(skipLines(str, 1));
      done(err);
    }
  });

  it('Should configure log message and theme of tasksJson flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--tasks-json')
      .run(cb);

    var s = fs.readFileSync(path.join(expectedDir, 'tasks-json.txt'), 'utf-8');
    var obj = JSON.parse(s);
    obj.label += tildify(path.join(fixturesDir, 'gulpfile.js'));

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(JSON.stringify(obj) + '\n');
      done(err);
    }
  });

  it('Should configure log message and theme of require flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--require', '../../test-module.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(headLines(stdout, 1, 1)).toEqual(
        '../../test-module.js HAS BEEN REQUIRED.'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of require error', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--require', '../../null-module.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(headLines(stdout, 1)).toEqual(
        'REQUIRE FAIL: ../../null-module.js'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of node flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--harmony')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(headLines(stdout, 1)).toEqual(
        'GULP HAS BEEN RESPAWNED BY --harmony'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of version flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--version')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'GULP VERSION: ' + gulpVersion + ' (GULP-CLI: ' + cliVersion + ').\n'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of cwd flag', function(done) {
    runner({ verbose: false })
      .gulp('--cwd', fixturesDir)
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(headLines(stdout, 1)).toEqual(
        'GULP CWD: ' + tildify(fixturesDir).toUpperCase() + '.'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of verify flag', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--verify', 'valid-package.json')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'VERIFY DEPENDENCIES IN ' +
          path.resolve(fixturesDir, 'valid-package.json') + ' ...\n' +
        'VERIFY OK\n'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of verify error', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--verify')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'VERIFY DEPENDENCIES IN ' +
          path.resolve(fixturesDir, 'package.json') + ' ...\n' +
        'BLACKLISTED gulp-blink: deprecated. use `blink` instead.\n'
      );
      done();
    }
  });

  it('Should configure log message and theme of gulpfile flag', function(done) {
    var gulpfile = path.join(fixturesDir, 'gulpfile.js');

    runner({ verbose: false })
      .gulp('--gulpfile', gulpfile)
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(headLines(stdout, 1, 1)).toEqual(
        'GULPFILE: ' + tildify(gulpfile) + '...'
      );
      done(err);
    }
  });

  it('Should configure log message and theme of gulpfile error', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'no-gulpfile')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual(
        'NO GULPFILE\n'
      );
      expect(stdout).toEqual('');
      done();
    }
  });

  it('Should configure log message and theme of task start/stop', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(skipLines(stdout, 1)).toEqual(
        'START default\n' +
        'START clean\n' +
        'STOP  clean\n' +
        'START build\n' +
        'STOP  build\n' +
        'STOP  default\n' +
      '');
      done(err);
    }
  });

  it('Should configure log message and theme of task start/error', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'gulpfile-error.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(headLines(stderr, 2)).toEqual(
        'ERROR default\n' +
        'Error: Default' +
      '');
      expect(skipLines(stdout, 1)).toEqual(
        'START default\n' +
      '');
      done();
    }
  });

  it('Should configure log message and theme of task not completion', function(done) {
    if (process.version.slice(0, 5) === 'v0.10') {
      this.skip();
      return;
    }

    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'gulpfile-error.js', 'notcomplete')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      expect(skipLines(stdout, 1)).toEqual(
        'START notcomplete\n' +
        'NOT COMPLETE notcomplete\n' +
      '');
      done();
    }
  });

  it('Should configure log message and theme of task not found', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'gulpfile-error.js', 'taskNotFound')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual(
        'TASK NOT FOUND: taskNotFound\n' +
      '');
      expect(skipLines(stdout, 1)).toEqual('');
      done();
    }
  });

  // This test will become effective after applying the PR js-liftoff#106
  it.skip('Should configure log message and theme of unknown completion type', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--completion=unknown')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual('UNKNOWN COMPLETION TYPE: unknown');
      done();
    }
  });

  // This test will become effective after applying the PR js-liftoff#106
  it.skip('Should configure log message and theme of missing completion type', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--completion')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toMatch('MISSING COMPLETION TYPE');
      expect(stdout).toEqual('');
      done();
    }
  });
});
