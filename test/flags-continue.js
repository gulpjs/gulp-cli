'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

lab.experiment('flag: --continue', function() {

  lab.test('continues execution when flag is set', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js test4 --continue --gulpfile "./test/fixtures/gulpfile-4-0.js"', function(err, stdout, stderr) {
      code.expect(stdout).to.contain('Starting \'errorFunction\'');
      code.expect(stderr).to.contain('\'errorFunction\' errored after');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[4]).to.contain('Starting \'anon\'');
      code.expect(stdout[5]).to.contain('Finished \'anon\'');
      done();
    });
  });

  lab.test('continues execution when flag is set', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js test4 --gulpfile "./test/fixtures/gulpfile-4-0.js"', function(err, stdout, stderr) {
      code.expect(stdout).to.contain('Starting \'errorFunction\'');
      code.expect(stderr).to.contain('\'errorFunction\' errored after');
      code.expect(stdout[4]).to.not.contain('Starting \'anon\'');
      done();
    });
  });

});
