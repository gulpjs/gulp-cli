'use strict';

var expect = require('expect');
var path = require('path');
var loadConfigFiles = require('../../lib/shared/config/loadfiles');

var fixturesDir = path.join(__dirname, '../fixtures/config');

describe('lib: config/loadfiles', function() {

  it('Should load config from files', function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'foo/bar/.gulp.json'),
      b: path.join(fixturesDir, 'qux/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['a', 'b']);

    expect(config).toEqual({
      description: 'description by .gulp.js in directory qux',
    });
    done();
  });

  it('Should load config files in specified order', function(done) {
    var configFilesBase = {
      a: path.join(fixturesDir, 'foo/bar/.gulp.json'),
      b: path.join(fixturesDir, 'qux/.gulp.js'),
    };

    var config = loadConfigFiles(configFilesBase, ['b', 'a']);

    expect(config).toEqual({
      description: 'Description by .gulp.json in directory foo/bar',
    });
    done();
  });
});
