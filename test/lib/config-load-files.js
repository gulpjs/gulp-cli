'use strict';

var expect = require('expect');
var path = require('path');
var loadConfigFiles = require('../../lib/shared/config/load-files');

var fixturesDir = path.join(__dirname, '../fixtures/config');

describe('lib: config/load-files', function() {

  it('Should load config from files', function(done) {
    var configFiles = {
      a: path.join(fixturesDir, 'lib/dir1/.gulp.json'),
      b: null,
      c: path.join(fixturesDir, 'lib/dir2/.gulp.js'),
    };

    var config = loadConfigFiles(configFiles, ['a', 'b', 'c']);

    expect(config).toEqual({
      description: 'description by .gulp.js in directory qux',
    });
    done();
  });

  it('Should load config files in specified order', function(done) {
    var configFiles = {
      a: path.join(fixturesDir, 'lib/dir1/.gulp.json'),
      b: null,
      c: path.join(fixturesDir, 'lib/dir2/.gulp.js'),
    };

    var config = loadConfigFiles(configFiles, ['b', 'c', 'a']);

    expect(config).toEqual({
      description: 'Description by .gulp.json in directory foo/bar',
    });
    done();
  });

  it('Should convert a value of `flags.gulpfile` to absolute path',
  function(done) {
    var configFiles = {
      a: path.join(fixturesDir, 'flags/gulpfile/.gulp.json'),
    };

    var config = loadConfigFiles(configFiles, ['a']);

    expect(config).toEqual({
      flags: {
        gulpfile: path.join(fixturesDir,
          'flags/gulpfile/is/here/mygulpfile.js'),
      },
    });
    done();
  });

});
