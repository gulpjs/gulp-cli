'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

lab.experiment('flag: --version', function () {

  lab.test('prints the version of CLI and local gulp', function (done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --version --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.contain('CLI version ' + cliVersion);
      code.expect(stdout).to.contain('Local version ' + gulpVersion);
      done(err);
    });
  });

});
