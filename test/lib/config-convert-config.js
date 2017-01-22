'use strict';

var expect = require('expect');
var path = require('path');
var convertConfig = require('../../lib/shared/config/convert-config');

var chalk = require('chalk');
var red = chalk.red;

var logger = require('fancy-log');
var origLogError = logger.error;
var logs;

describe('lib: config/convert-config', function() {

  beforeEach(function() {
    logs = [];
    logger.error = function(log) {
      logs.push(log);
    };
  });

  afterEach(function() {
    logs.error = origLogError;
  });

  it('description', function(done) {
    var convert = convertConfig.description;
    expect(convert).toBeA('function');

    expect(convert('abc', 'config/file/path')).toEqual('abc');
    expect(logs.length).toEqual(0);

    expect(convert(null, 'config/file/path')).toBeA('undefined');
    expect(logs.length).toEqual(1);

    expect(convert(0, 'config/file/path')).toBeA('undefined');
    expect(logs.length).toEqual(2);

    expect(convert('', 'config/file/path')).toBeA('undefined');
    expect(logs.length).toEqual(3);

    expect(logs).toEqual([
      red('config/file/path: config.description must be a string: null'),
      red('config/file/path: config.description must be a string: 0'),
      red('config/file/path: config.description requires a value.'),
    ]);

    done();
  });

  it('flags.silent', function(done) {
    var convert = convertConfig['flags.silent'];
    expect(convert).toBeA('function');

    expect(convert(true, 'file/path')).toEqual(true);
    expect(convert(false, 'file/path')).toEqual(false);
    expect(logs.length).toEqual(0);

    expect(convert(null, 'file/path')).toBeA('undefined');
    expect(logs.length).toEqual(1);

    expect(convert(0, 'file/path')).toBeA('undefined');
    expect(logs.length).toEqual(2);

    expect(convert('', 'file/path')).toBeA('undefined');
    expect(logs.length).toEqual(3);

    expect(logs).toEqual([
      red('file/path: config.flags.silent must be a boolean: null'),
      red('file/path: config.flags.silent must be a boolean: 0'),
      red('file/path: config.flags.silent must be a boolean: '),
    ]);
    done();
  });

  it('flags.gulpfile', function(done) {
    var convert = convertConfig['flags.gulpfile'];
    expect(convert).toBeA('function');

    expect(convert('abc', 'path/to/config')).toEqual(
      path.join(process.cwd(), 'path/to/abc'));
    expect(logs.length).toEqual(0);

    expect(convert(null, 'path/to/config')).toBeA('undefined');
    expect(logs.length).toEqual(1);

    expect(convert(0, 'path/to/config')).toBeA('undefined');
    expect(logs.length).toEqual(2);

    expect(convert('', 'path/to/config')).toBeA('undefined');
    expect(logs.length).toEqual(3);

    expect(logs).toEqual([
      red('path/to/config: config.flags.gulpfile must be a string: null'),
      red('path/to/config: config.flags.gulpfile must be a string: 0'),
      red('path/to/config: config.flags.gulpfile requires a value.'),
    ]);
    done();
  });

});
