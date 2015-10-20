'use strict';
var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('flag: --verify', function() {

  lab.test('dependencies with invalid dependency', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --verify "packages/invalid-package.json" --cwd "./test/fixtures/packages/"', function(err, stdout) {
      // Ignore err as the verify failure is considered a error state.
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[1]).to.contain('Blacklisted plugins found in this project:');
      code.expect(stdout[2]).to.contain('gulp-blink: deprecated. use `blink` instead.');
      done();
    });
  });

  lab.test('dependencies with valid dependency', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --verify "packages/valid-package.json" --cwd "./test/fixtures/packages/"', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[1]).to.contain(' There are no blacklisted plugins in this project');
      done(err);
    });
  });

  lab.test('default args with invalid dependency', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --verify "packages/package.json" --cwd ./test/fixtures/packages/', function(err, stdout) {
      console.log(stdout);
      // Ignore err as the verify failure is considered a error state.
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[1]).to.contain('Blacklisted plugins found in this project:');
      code.expect(stdout[2]).to.contain('gulp-blink: deprecated. use `blink` instead.');
      done();
    });
  });

});
