'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');
var child = require('child_process');

lab.experiment('logging', function() {
  lab.test('flag: --log-level debug', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js --log-level debug', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test debug');
      code.expect(stdout[1]).to.contain('test info');
      code.expect(stdout[2]).to.contain('test warn');
      code.expect(stdout[3]).to.contain('test error');
      done(err);
    });
  });

  lab.test('flag: --log-level info', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js --log-level info', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test info');
      code.expect(stdout[1]).to.contain('test warn');
      code.expect(stdout[2]).to.contain('test error');
      done(err);
    });
  });

  lab.test('flag: --log-level info', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js --log-level warn', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      code.expect(stdout[0]).to.contain('test warn');
      code.expect(stdout[1]).to.contain('test error');
      done(err);
    });
  });

  lab.test('flag: --log-level error', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js --log-level error', function(err, stdout) {
      code.expect(stdout).to.contain('test error');
      done(err);
    });
  });
});
