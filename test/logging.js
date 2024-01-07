'use strict';

var expect = require('expect');
var exec = require('child_process').exec;

describe('logging', function() {

  it('log-level flag for debug: -LLLL', function(done) {
    exec('node ' + __dirname + '/fixtures/logging.js -LLLL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toMatch('test error');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test debug');
      expect(stdout[1]).toMatch('test info');
      expect(stdout[2]).toMatch('test warn');
      done(err);
    }
  });

  it('no log-level flag: defaults to -LLL', function(done) {
    exec('node ' + __dirname + '/fixtures/logging.js', cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toMatch('test error');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      done(err);
    }
  });

  it('log-level flag for info: -LLL', function(done) {
    exec('node ' + __dirname + '/fixtures/logging.js -LLL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toMatch('test error');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      done(err);
    }
  });

  it('log-level flag for warn: -LL', function(done) {
    exec('node ' + __dirname + '/fixtures/logging.js -LL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toMatch('test error');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test warn');
      done(err);
    }
  });

  it('log-level flag for error: -L', function(done) {
    exec('node ' + __dirname + '/fixtures/logging.js -L', cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toMatch('test error');
      expect(stdout).toEqual('');
      done(err);
    }
  });
});
