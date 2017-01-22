'use strict';

var expect = require('expect');
var excludeCliArgs = require('../../lib/shared/config/exclude-cli-args');

var originalArgv = process.argv;

describe('lib: config/exclude-cli-args', function() {

  afterEach(function(done) {
    process.argv = originalArgv;
    done();
  });

  describe('config.flags is not empty', function() {

    it('Should remain config flags which is not specified by cli args',
    function(done) {
      process.argv = originalArgv.concat();

      var config = { flags: { silent: true } };
      var result = excludeCliArgs(config);
      expect(result).toEqual({ flags: { silent: true } });

      config = {
        flags: {
          help: false,
          depth: 4,
          tasks: false,
          silent: true,
        },
      };
      result = excludeCliArgs(config);
      expect(result).toEqual({
        flags: {
          help: false,
          depth: 4,
          tasks: false,
          silent: true,
        },
      });
      done();
    });

    it('Should remove config flags which is specified by cli args',
    function(done) {
      process.argv = originalArgv.concat([
        '--silent',
      ]);
      var config = { flags: { silent: true } };

      var result = excludeCliArgs(config);
      expect(result).toEqual({ flags: {} });

      config = {
        flags: {
          help: false,
          depth: 4,
          tasks: false,
          silent: true,
        },
      };
      result = excludeCliArgs(config);
      expect(result).toEqual({
        flags: {
          help: false,
          depth: 4,
          tasks: false,
        },
      });
      done();
    });

    it('Should remove config flags of which alias is specified by cli args',
    function(done) {
      process.argv = originalArgv.concat([
        '-S',
      ]);
      var config = { flags: { silent: true } };

      var result = excludeCliArgs(config);
      expect(result).toEqual({ flags: {} });

      config = {
        flags: {
          help: false,
          depth: 4,
          tasks: false,
          silent: true,
        },
      };
      result = excludeCliArgs(config);
      expect(result).toEqual({
        flags: {
          help: false,
          depth: 4,
          tasks: false,
        },
      });
      done();
    });

  });

  describe('config.flags is empty', function() {

    it('Should cause nothing when user specified no arg', function(done) {
      process.argv = originalArgv.concat();

      var config = {};
      var result = excludeCliArgs(config);
      expect(result).toEqual({});

      config = null;
      var result = excludeCliArgs(config);
      expect(result).toEqual({});
      done();
    });

    it('Should cause nothing when user specified args', function(done) {
      process.argv = originalArgv.concat([
        '--silent',
      ]);

      var config = {};
      var result = excludeCliArgs(config);
      expect(result).toEqual({});

      config = null;
      var result = excludeCliArgs(config);
      expect(result).toEqual({});
      done();
    });
  });

});
