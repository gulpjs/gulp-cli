'use strict';

var expect = require('expect');
var child = require('child_process');

describe('logging (log levels & theming)', function() {

  it('log-level flag for debug: -LLLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLLL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('**error** test error: E001\n');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toEqual('test debug');
      expect(stdout[1]).toEqual('(!) test info - foo');
      expect(stdout[2]).toEqual('(warning) test warn');
      done(err);
    }
  });

  it('no log-level flag: defaults to -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js', cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('**error** test error: E001\n');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toEqual('(!) test info - foo');
      expect(stdout[1]).toEqual('(warning) test warn');
      done(err);
    }
  });

  it('log-level flag for info: -LLL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LLL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('**error** test error: E001\n');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toEqual('(!) test info - foo');
      expect(stdout[1]).toEqual('(warning) test warn');
      done(err);
    }
  });

  it('log-level flag for warn: -LL', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -LL', cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('**error** test error: E001\n');
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toEqual('(warning) test warn');
      done(err);
    }
  });

  it('log-level flag for error: -L', function(done) {
    child.exec('node ' + __dirname + '/fixtures/logging.js -L', cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('**error** test error: E001\n');
      expect(stdout).toEqual('');
      done(err);
    }
  });
});
