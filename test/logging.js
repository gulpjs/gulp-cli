'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');
var child = require('child_process');

lab.experiment('logging', function() {
  lab.test('log-level flag for debug: -LLLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLLL', function(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test debug');
      code.expect(stdout[1]).to.contain('test info');
      code.expect(stdout[2]).to.contain('test warn');
      code.expect(stderr).to.contain('test error');
      done(err);
    });
  });

  lab.test('no log-level flag: defaults to -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js', function(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test info');
      code.expect(stdout[1]).to.contain('test warn');
      code.expect(stderr).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for info: -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLL', function(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test info');
      code.expect(stdout[1]).to.contain('test warn');
      code.expect(stderr).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for warn: -LL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LL', function(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test warn');
      code.expect(stderr).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for error: -L', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -L', function(err, stdout, stderr) {
      code.expect(stderr).to.contain('test error');
      done(err);
    });
  });
});
