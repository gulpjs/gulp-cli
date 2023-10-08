'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, '..');

describe('flag: --gulpfile', function() {

  it('Manually set path of gulpfile using --gulpfile', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile-2.js';

    exec(cd(baseDir).gulp('--gulpfile', gulpfilePath), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');

      var chgWorkdirLog = sliceLines(stdout, 0, 1);
      var workdir = path.dirname(gulpfilePath).replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'logGulpfilePath\'...\n' +
        path.resolve(gulpfilePath) + '\n' +
        'Finished \'logGulpfilePath\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

  it('Manually set path of gulpfile using -f', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile-2.js';

    exec(cd(baseDir).gulp('-f', gulpfilePath), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');

      var chgWorkdirLog = sliceLines(stdout, 0, 1);
      var workdir = path.dirname(gulpfilePath).replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'logGulpfilePath\'...\n' +
        path.resolve(gulpfilePath) + '\n' +
        'Finished \'logGulpfilePath\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

});
