'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

lab.experiment('flag: --silent', function() {

  lab.test('prints nothing when silent flag is set', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --silent --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.equal('');
      done(err);
    });
  });

});
