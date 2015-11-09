'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

lab.experiment('flag: --gulpfile', function() {

  lab.test('Manually set path of gulpfile', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --gulpfile "./test/fixtures/gulpfile-2.js"', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[1]).to.contain('test/fixtures/gulpfile-2.js');
      code.expect(stdout[5]).to.contain('Finished \'default\'');
      done(err);
    });
  });

});
