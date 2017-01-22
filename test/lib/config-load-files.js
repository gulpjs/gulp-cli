'use strict';

var expect = require('expect');
var path = require('path');
var loadConfigFiles = require('../../lib/shared/config/load-files');

var chalk = require('chalk');
var red = chalk.red;

var fixturesDir = path.join(__dirname, '../fixtures/config');

var logger = require('fancy-log');
var origLogError = logger.error;
var logs;

describe('lib: config/load-files', function() {

  beforeEach(function() {
    logs = [];
    logger.error = function(log) {
      logs.push(log);
    };
  });

  afterEach(function() {
    logger.error = origLogError;
  });

  it('Should load config from files', function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'foo/bar/.gulp.json'),
      b: null,
      c: path.join(fixturesDir, 'qux/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['a', 'b', 'c']);

    expect(config).toEqual({
      description: 'description by .gulp.js in directory qux',
    });
    expect(logs.length).toEqual(0);
    done();
  });

  it('Should load config files in specified order', function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'foo/bar/.gulp.json'),
      b: null,
      c: path.join(fixturesDir, 'qux/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['b', 'c', 'a']);

    expect(config).toEqual({
      description: 'Description by .gulp.json in directory foo/bar',
    });
    expect(logs.length).toEqual(0);
    done();
  });

  it('Should load and convert a config prop if it is a path', function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'flags/gulpfile/.gulp.json'),
    };

    var config = loadConfigFiles(configFilesBase, ['a']);

    expect(config).toEqual({
      flags: {
        gulpfile: path.join(fixturesDir,
          'flags/gulpfile/is/here/mygulpfile.js'),
      },
    });
    expect(logs.length).toEqual(0);
    done();
  });

  it('Should ignore if a config prop value is null or undefined',
  function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'err/case1/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['a']);

    expect(config).toEqual({});
    expect(logs.length).toEqual(0);
    done();
  });

  it('Should let pass if a config prop is not defined in converter',
  function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'err/case2/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['a']);

    expect(config).toEqual({
      description: 'DESC.',
      'non-exist-in-converter': 'ABC',
    });
    expect(logs.length).toEqual(0);
    done();
  });

  it('Should output an error log and ignore if a config prop value is invalid',
  function(done) {
    var fp = path.join(fixturesDir, 'err/case3/.gulp.js');
    var configFilesBase = { a: fp };
    var config = loadConfigFiles(configFilesBase, ['a']);

    expect(config).toEqual({ flags: {} });
    expect(logs).toEqual([
      red(fp + ': config.description must be a string: true'),
      red(fp + ': config.flags.silent must be a boolean: 123'),
      red(fp + ': config.flags.gulpfile requires a value.'),
    ]);
    done();
  });

});
