'use strict';

var expect = require('expect');
var child = require('child_process');
var path = require('path');

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var isIstanbul = process.env.running_under_istanbul;
// jscs:enable

var cmd;
if (isIstanbul) {
  cmd = path.resolve(__dirname, '../node_modules/.bin/istanbul') +
    ' cover --root ' + path.dirname(__dirname) +
    ' ' + __dirname + '/fixtures/logging.js' +
    ' --dir ' + path.dirname(__dirname) + '/coverage/logging' +
    ' --print none' +
    ' --';
} else {
  cmd = 'node ' + __dirname + '/fixtures/logging.js';
}


describe('logging', function() {

  it('log-level flag for debug: -LLLL', function(done) {
    child.exec(cmd + ' -LLLL', cb);

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
    child.exec(cmd, cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for info: -LLL', function(done) {
    child.exec(cmd + ' -LLL', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test info');
      expect(stdout[1]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for warn: -LL', function(done) {
    child.exec(cmd + ' -LL', cb);

    function cb(err, stdout, stderr) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      expect(stdout[0]).toMatch('test warn');
      expect(stderr).toMatch('test error');
      done(err);
    }
  });

  it('log-level flag for error: -L', function(done) {
    child.exec(cmd + ' -L', cb);

    function cb(err, stdout, stderr) {
      expect(stderr).toMatch('test error');
      done(err);
    }
  });
});
