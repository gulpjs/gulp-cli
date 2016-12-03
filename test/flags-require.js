'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var path = require('path');

lab.experiment('flag: --require', function() {

  lab.test('requires module before running gulpfile', function(done) {
    runner({ verbose: false })
      .gulp('--require ../test-module.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      var insideLog = headLines(stdout, 1);
      expect(insideLog).to.equal('inside test module');

      var requireLog = eraseTime(headLines(stdout, 1, 1));
      expect(requireLog).to.equal(
        'Requiring external module ../test-module.js');

      var chgWorkdirLog = headLines(stdout, 1, 2);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).to.contains('Working directory changed to ');
      expect(chgWorkdirLog).to.contains(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 4)));
      expect(stdout).to.equal(
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
        ''
      );
      done(err);
    }
  });

  lab.test('errors if module doesn\'t exist', function(done) {
    runner({ verbose: false })
      .gulp('--require ./null-module.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(stdout).to.not.contain('inside test module');
      expect(stdout).to.not.contain(
        'Requiring external module ../test-module.js');

      var chgWorkdirLog = headLines(stdout, 1);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).to.contains('Working directory changed to ');
      expect(chgWorkdirLog).to.contains(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).to.equal(
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
        ''
      );

      stderr = eraseTime(stderr);
      expect(stderr).to.equal(
        'Failed to load external module ./null-module.js\n');
      done(err);
    }
  });

});
