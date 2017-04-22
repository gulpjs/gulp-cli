'use strict';

var expect = require('expect');
var mergeConfig = require('../../lib/shared/config/env-flags');

describe('lib: config/env-flags', function() {

  it('Should copy only config props specified to env flags', function(done) {
    var env = {};

    var config = {
      description: 'DESCRIPTION.',
      flags: {
        silent: true,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeConfig(env, config);
    expect(result).toEqual({
      configPath: '/path/to/gulpfile',
      configBase: '/path/to',
    });
    done();
  });

  it('Should override env flags with config props', function(done) {
    var env = {
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
    };

    var config = {
      description: 'DESCRIPTION.',
      flags: {
        silent: false,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeConfig(env, config);
    expect(result).toEqual({
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/to/gulpfile',
      configBase: '/path/to',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
    });
    done();
  });

  it('Should not cause error if config is empty', function(done) {
    var env = {
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
    };

    var config = {};

    var result =  mergeConfig(env, config);
    expect(result).toEqual({
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
    });
    done();
  });

});
