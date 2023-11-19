'use strict';

var expect = require('expect');
var overrideEnvFlags = require('../../lib/shared/config/env-flags');

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

    var result =  overrideEnvFlags(env, config, {});
    expect(result).toEqual({
      configPath: '/path/to/gulpfile',
      configBase: '/path/to',
      config: {
        description: 'DESCRIPTION.',
        flags: {
          silent: true,
        },
      },
    });
    expect(result).toBe(env);
    done();
  });

  it('Should take into account forced gulpfile opts from flags', function(done) {
    var env = {
      cwd: '/path/to/cwd',
      preload: 'preload',
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
        preload: ['a', 'b'],
      },
    };

    var opts = {
      gulpfile: env.configPath,
    };

    var result =  overrideEnvFlags(env, config, opts);
    expect(result).toEqual({
      cwd: '/path/to/cwd',
      preload: ['preload', 'a', 'b'],
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
      config: {
        description: "DESCRIPTION.",
        flags: {
          gulpfile: "/path/of/config/path",
          silent: false,
        },
      },
    });
    expect(result).toBe(env);
    done();
  });

  it('Should not cause error if config is empty', function(done) {
    var env = {
      cwd: '/path/to/cwd',
      preload: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
    };

    var config = {};

    var result =  overrideEnvFlags(env, config, {});
    expect(result).toEqual({
      cwd: '/path/to/cwd',
      preload: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { aaa: {} },
      config: {
        flags: {},
      },
    });
    expect(result).toBe(env);
    done();
  });
});
