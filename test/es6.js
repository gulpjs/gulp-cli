'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('es6', function () {

  lab.test('supports es6', function (done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --cwd ./test --gulpfile test/gulpfile.es6', function(err, stdout) {
      code.expect(stdout).to.contain('Requiring external module 6to5/register');
      done(err);
    });
  });

});
