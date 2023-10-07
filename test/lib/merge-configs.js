'use strict';

var expect = require('expect');
var path = require('path');
var mergeConfigs = require('../../lib/shared/config/merge-configs');

var fixturesDir = path.join(__dirname, '../fixtures/config');

describe('lib: config/merge-configs', function() {

  it('Should get merged config when there is only project config', function(done) {
    var config = {
      project: {
        description: 'description by .gulp.js in directory project',
      },
      userHome: {},
    };
    var configFiles = {
      project: path.join(fixturesDir, 'project/.gulp.js'),
      userHome: undefined,
    };
    var env = {
      config: config,
      configFiles: configFiles,
    };

    var cfg = mergeConfigs(env);

    expect(cfg).toEqual({
      description: 'description by .gulp.js in directory project',
    });
    done();
  });

  it('Should get merged config when there is only user-home config', function(done) {
    var config = {
      project: {},
      userHome: {
        description: 'description by .gulp.js in directory user home',
      },
    };
    var configFiles = {
      project: undefined,
      userHome: path.join(fixturesDir, 'user/home/.gulp.js'),
    };
    var env = {
      config: config,
      configFiles: configFiles,
    };

    var cfg = mergeConfigs(env);

    expect(cfg).toEqual({
      description: 'description by .gulp.js in directory user home',
    });
    done();
  });

  it('Should get merged config when there are both project and user-home config', function(done) {
    var config = {
      project: {
        description: 'description by .gulp.js in directory project',
        flags: {
          series: true,
        },
      },
      userHome: {
        description: 'description by .gulp.js in directory user home',
        flags: {
          silent: true,
        },
      },
    };
    var configFiles = {
      project: path.join(fixturesDir, 'project/gulp.js'),
      userHome: path.join(fixturesDir, 'user/home/.gulp.js'),
    };
    var env = {
      config: config,
      configFiles: configFiles,
    };

    var cfg = mergeConfigs(env);

    expect(cfg).toEqual({
      description: 'description by .gulp.js in directory project',
      flags: {
        series: true,
        silent: true,
      },
    });
    done();
  });

  it('Should convert a value of `flags.gulpfile` to absolute path', function(done) {
    var config = {
      project: {
        flags: { gulpfile: './is/here/mygulpfile.js' },
      },
    };
    var configFiles = {
      project: path.join(fixturesDir, 'flags/gulpfile/.gulp.json'),
    };
    var env = {
      config: config,
      configFiles: configFiles,
    };

    var cfg = mergeConfigs(env);

    expect(cfg).toEqual({
      flags: {
        gulpfile: path.join(fixturesDir, 'flags/gulpfile/is/here/mygulpfile.js'),
      },
    });
    done();
  });

});
