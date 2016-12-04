'use strict';

var expect = require('expect');

var mergeToEnvFlags = require('../../lib/shared/config/env-flags');

describe('lib: config/env-flags', function() {

  describe('config.flags is not empty', function() {
    it('Should merge target flags which is not specified by user',
    function(done) {
      var envOpts = {
        cwd: null,
        configPath: null,
        require: null,
        completion: null,
      };
      var config = {
        flags: { gulpfile: 'path/to/gulpfile.js' },
      };

      var envFlags = {};
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({
        configPath: 'path/to/gulpfile.js',
        configBase: 'path/to',
      });

      envFlags = {
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      };
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'path/to/gulpfile.js',
        configBase: 'path/to',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      });
      done();
    });

    it('Should not merge target flags which is specified by user',
    function(done) {
      var envOpts = {
        cwd: '.',
        configPath: 'x',
        require: 'y',
        completion: 'z',
      };
      var config = {
        flags: { gulpfile: 'path/to/gulpfile.js' },
      };

      var envFlags = {};
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({});

      envFlags = {
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      };
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      });
      done();
    });
  });

  describe('config.flags is empty', function() {
    it('Should not case error when user specified no arg', function(done) {
      var envOpts = {
        cwd: null,
        configPath: null,
        require: null,
        completion: null,
      };
      var config = {};

      var envFlags = {};
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({});

      envFlags = {
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      };
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      });
      done();
    });

    it('Should not case error when user specified args', function(done) {
      var envOpts = {
        cwd: '.',
        configPath: 'x',
        require: 'y',
        completion: 'z',
      };
      var config = {};

      var envFlags = {};
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({});

      envFlags = {
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      };
      mergeToEnvFlags(envFlags, config, envOpts);
      expect(envFlags).toEqual({
        cwd: 'c/w/d',
        require: ['r/e/q'],
        configNameSearch: ['config/name/search'],
        configPath: 'config/path',
        configBase: 'config/base',
        modulePath: 'module/path',
        modulePackage: 'module/package',
        configFiles: {},
      });
      done();
    });
  });
});
