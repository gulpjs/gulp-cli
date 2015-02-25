'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('es6', function () {

  lab.test('supports babel', function (done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --cwd ./test/fixtures --gulpfile test/fixtures/gulpfile.babel.js', function(err, stdout) {
      code.expect(stdout).to.contain('Requiring external module babel/register');
      done(err);
    });
  });

});
