'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('flag: --require', function() {
  lab.test('requires module before running gulpfile', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --require ../test-module.js --cwd ./test/fixtures/gulpfiles', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.equal('inside test module');
      code.expect(stdout[1]).to.contain('Requiring external module ../test-module.js');
      done(err);
    });
  });
  lab.test('errors if module doesn\'t exist', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --require ./null-module.js --cwd ./test/fixtures/gulpfiles', function(err, stdout, stderr) {
      stderr = stderr.replace(/\\/g, '/').split('\n');
      code.expect(stderr[0]).to.contain('Failed to load external module ./null-module.js');
      done(err);
    });
  });
});
