'use strict';

var expect = require('expect');
var child = require('child_process');

describe('logging', function() {

  it('log-level flag for debug: -LLLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLLL', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test debug');
      expect(stdout[1]).toMatch('test info');
      expect(stdout[2]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('no log-level flag: defaults to -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for info: -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLL', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for warn: -LL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LL', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for error: -L', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -L', cb);

    function cb(err, stdout, stderr) {
      expect(stderr).toMatch('test error');
      done(err);
    }
  });
});
