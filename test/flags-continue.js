'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, '..');

describe('flag: --continue', function() {

  it('continues execution when flag is set', function(done) {
    exec(cd(baseDir).gulp(
      'test4',
      '--continue',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(sliceLines(stdout, 2)).toEqual(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        'Starting \'anon\'...\n' +
        'Finished \'anon\' after ?\n' +
        ''
      );
      expect(sliceLines(stderr, 0, 2)).toEqual(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('stops execution when flag is not set', function(done) {
    exec(cd(baseDir).gulp('test4', '--cwd ./test/fixtures/gulpfiles'), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).not.toMatch('Starting \'anon\'');
      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        ''
      );
      expect(sliceLines(stderr, 0, 2)).toEqual(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

});
