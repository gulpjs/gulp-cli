'use strict';

var expect = require('expect');
var os = require('os');
var path = require('path');

var childProcess = require('child_process');
var exec = childProcess.exec;

var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var tildify = require('../lib/shared/tildify');

var gulpfileDir = path.resolve(__dirname, 'fixtures/gulpfiles');
var gulpfilePath = path.resolve(gulpfileDir, 'gulpfile.js');

var gulpJsPath = '\\\\?\\' + path.resolve(__dirname, '../bin/gulp.js');

describe('windows extended length paths', function() {
  it('Should run normaly even if using \'\\\\?\\\'prefix in paths', function(done) {
    if (os.platform() !== 'win32') {
      this.skip();
      return;
    }

    var cmd = ['node', gulpJsPath, '--no-color', '--gulpfile', gulpfilePath].join(' ');

    exec(cmd, function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var workingDir = tildify(gulpfileDir);
      var usingGulpfile = tildify(gulpfilePath);

      stdout = eraseLapse(eraseTime(stdout));
      expect(stdout).toEqual('' +
        'Working directory changed to ' + workingDir + '\n' +
        'Using gulpfile ' + usingGulpfile + '\n' +
        'Starting \'default\'...\n' +
        'Starting \'test1\'...\n' +
        'Starting \'noop\'...\n' +
        'Finished \'noop\' after ?\n' +
        'Finished \'test1\' after ?\n' +
        'Starting \'test3\'...\n' +
        'Starting \'described\'...\n' +
        'Finished \'described\' after ?\n' +
        'Finished \'test3\' after ?\n' +
        'Starting \'noop\'...\n' +
        'Finished \'noop\' after ?\n' +
        'Finished \'default\' after ?\n' +
        '');
      done();
    });
  });
});
