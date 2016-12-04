'use strict';

var expect = require('expect');
var path = require('path');

var configSpecs = require('../../lib/shared/config/cfg-specs');

describe('lib: config/cfg-specs', function() {

  it('description', function(done) {
    var validate = configSpecs.description.validate;
    expect(validate).toBeA('function');
    expect(validate('abc')).toEqual('abc');

    expect(function() {
      validate(null);
    }).toThrow(TypeError, 'config.description must be a string: null');

    expect(function() {
      validate(0);
    }).toThrow(TypeError, 'config.description must be a string: 0');

    expect(function() {
      validate('');
    }).toThrow(Error, 'config.description requires a value.');
    done();
  });

  it('flags.silent', function(done) {
    var validate = configSpecs['flags.silent'].validate;
    expect(validate).toBeA('function');
    expect(validate(true)).toEqual(true);
    expect(validate(false)).toEqual(false);

    expect(function() {
      validate(null);
    }).toThrow(TypeError, 'config.flags.silent must be a boolean: null');

    expect(function() {
      validate(0);
    }).toThrow(TypeError, 'config.flags.silent must be a boolean: 0');

    expect(function() {
      validate('');
    }).toThrow(TypeError, 'config.flags.silent must be a boolean: ');
    done();
  });

  it('flags.gulpfile', function(done) {
    var validate = configSpecs['flags.gulpfile'].validate;
    expect(validate).toBeA('function');
    expect(validate('abc', 'path/to/config')).toEqual(
      path.join(process.cwd(), 'path/to/abc'));

    expect(function() {
      validate(null);
    }).toThrow(TypeError, 'config.flags.gulpfile must be a string: null');

    expect(function() {
      validate(0);
    }).toThrow(TypeError, 'config.flags.gulpfile must be a string: 0');

    expect(function() {
      validate('');
    }).toThrow(Error, 'config.flags.gulpfile requires a value.');
    done();
  });

});
