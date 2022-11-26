'use strict';

var expect = require('expect');
var path = require('path');
var normalizeConfig = require('../../lib/shared/config/normalize-config');

var fixturesDir = path.join(__dirname, '../fixtures/config');

describe('lib: config/normalize-config', function() {

  it('Should normalize config', function(done) {
    var config = {
      '.gulp': {
        description: 'description by .gulp.js in directory qux',
      },
    };
    var configFiles = {
      '.gulp': path.join(fixturesDir, 'qux/.gulp.js'),
    };

    var key = '.gulp';
    var cfg = normalizeConfig(config[key], configFiles[key]);

    expect(cfg).toEqual({
      description: 'description by .gulp.js in directory qux',
    });
    done();
  });

  it('Should convert a value of `flags.gulpfile` to absolute path', function(done) {
    var config = {
      '.gulp': {
        flags: { gulpfile: './is/here/mygulpfile.js' },
      },
    };
    var configFiles = {
      '.gulp': path.join(fixturesDir, 'flags/gulpfile/.gulp.json'),
    };

    var key = '.gulp';
    var cfg = normalizeConfig(config[key], configFiles[key]);

    expect(cfg).toEqual({
      flags: {
        gulpfile: path.join(fixturesDir,
          'flags/gulpfile/is/here/mygulpfile.js'),
      },
    });
    done();
  });

});
