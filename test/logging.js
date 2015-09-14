'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');
var child = require('child_process');

lab.experiment('logging', function() {
  lab.test('log-level flag for debug: -llll', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -llll', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test debug');
      code.expect(stdout[1]).to.contain('test info');
      code.expect(stdout[2]).to.contain('test warn');
      code.expect(stdout[3]).to.contain('test error');
      done(err);
    });
  });

  lab.test('no log-level flag: defaults to -lll', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test info');
      code.expect(stdout[1]).to.contain('test warn');
      code.expect(stdout[2]).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for info: -lll', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -lll', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test info');
      code.expect(stdout[1]).to.contain('test warn');
      code.expect(stdout[2]).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for warn: -ll', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -ll', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test warn');
      code.expect(stdout[1]).to.contain('test error');
      done(err);
    });
  });

  lab.test('log-level flag for error: -l', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -l', function(err, stdout) {
      code.expect(stdout).to.contain('test error');
      done(err);
    });
  });
});
