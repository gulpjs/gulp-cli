'use strict';

var expect = require('expect');
var mergeToCliFlags = require('../../lib/shared/config/cli-flags');
var cliOptions = require('../../lib/shared/cliOptions');

var originalArgv = process.argv;

describe('lib: config/cli-flag', function() {

  afterEach(function(done) {
    process.argv = originalArgv;
    done();
  });

  describe('config.flags is not empty', function() {

    it('Should merge flags which is not specified by user', function(done) {
      process.argv = originalArgv.slice();
      var config = { flags: { silent: true } };

      var cliFlags = {};
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        silent: true,
      });

      cliFlags = {
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      };
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        help: false,
        depth: 4,
        tasks: false,
        silent: true,
      });
      done();
    });

    it('Should not merge flags which is specified by user', function(done) {
      process.argv = originalArgv.concat([
        '--silent',
      ]);
      var config = { flags: { silent: true } };

      var cliFlags = {};
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({});

      cliFlags = {
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      };
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      });
      done();
    });

    it('Should not merge flags of which alias is specified by user',
    function(done) {
      process.argv = originalArgv.concat([
        '-S',
      ]);
      var config = { flags: { silent: true } };

      var cliFlags = {};
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({});

      cliFlags = {
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      };
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      });
      done();
    });

  });

  describe('config.flags is empty', function() {
    it('Should not cause error when user specified no arg', function(done) {
      process.argv = originalArgv.slice();
      var config = {};

      var cliFlags = {};
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({});

      cliFlags = {
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      };
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      });
      done();
    });

    it('Should not cause error when user specified args', function(done) {
      process.argv = originalArgv.concat([
        '--silent',
      ]);
      var config = {};

      var cliFlags = {};
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({});

      cliFlags = {
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      };
      mergeToCliFlags(cliFlags, config, cliOptions);
      expect(cliFlags).toEqual({
        help: false,
        depth: 4,
        tasks: false,
        silent: false,
      });
      done();
    });
  });

});

