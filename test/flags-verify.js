'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var path = require('path');
var http = require('http');
var net = require('net');
var assert = require('assert');

var proxyPort = 8881;

describe('flag: --verify', function() {

  it('dependencies with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify invalid-package.json', '--cwd ./test/fixtures/verify/')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/verify/invalid-package.json') +
          '\n' +
        'Blacklisted plugins found in this project:\n' +
        'gulp-blink: deprecated. use `blink` instead.\n' +
        ''
      );
      done();
    }
  });

  it('dependencies with valid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify valid-package.json', '--cwd ./test/fixtures/verify/')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/verify/valid-package.json') +
          '\n' +
        'There are no blacklisted plugins in this project\n' +
        ''
      );
      done(err);
    }
  });

  it('default args with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify', '--cwd', path.resolve('./test/fixtures/verify/'))
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/verify/package.json') + '\n' +
        'Blacklisted plugins found in this project:\n' +
        'gulp-blink: deprecated. use `blink` instead.\n' +
        ''
      );
      done();
    }
  });

  it('proxy: dependencies with valid dependency', function(done) {
    var proxyServer = createProxyServer(proxyPort);
    proxyServer.on('listening', function() {
      testProxyImplementation(function(err, stdout, stderr) {
        proxyServer.close();

        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        stdout = eraseTime(stdout);
        expect(stdout).toEqual(
          'Verifying plugins in ' +
            path.resolve('./test/fixtures/packages/valid-package.json') +
            '\n' +
          'There are no blacklisted plugins in this project\n' +
          ''
        );
        done();
      });
    });
  });

  it('proxy: proxy server not reachable', function(done) {
    testProxyImplementation(function(err, stdout, stderr) {
      expect(err).toNotEqual(null);

      // Stderr is expected to contain " 127.0.0.1:8881\n" if node >= 4
      // Use a regexp to make sure, it is the right string, if it is present
      stderr = eraseTime(stderr);
      expect(stderr).toMatch(
          new RegExp('Error: failed to retrieve plugins black-list\n' +
          'connect ECONNREFUSED( 127.0.0.1:' + proxyPort + ')?\n')
        );
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/valid-package.json') +
          '\n'
      );
      done();
    });
  });

  function testProxyImplementation(cb) {
    runner({ verbose: false })
      .gulp('--verify ../../../packages/valid-package.json', '--cwd ./test/fixtures/config/flags/proxy/')
      .run(cb);
  }

  function createProxyServer(proxyPort) {
    var proxy = http.createServer(function() {
      assert.fail('could not start proxy server');
    });

    proxy.on('connect', onConnect);
    proxy.on('error', onError);

    function onConnect(req, clientSocket, head) {

      expect(req.method).toBe('CONNECT');
      expect(req.url).toEqual('gulpjs.com:443');

      var serverSocket = net.connect(443, 'gulpjs.com', function() {
        clientSocket.write('HTTP/1.1 200 Connection established\r\n\r\n');
        clientSocket.pipe(serverSocket);
        serverSocket.write(head);
        serverSocket.pipe(clientSocket);
      });

      serverSocket.on('error', onError);
    }

    function onError(error) {
      assert.fail('could not start proxy server (' + JSON.stringify(error) + ')');
    }

    proxy.listen(proxyPort);

    return proxy;
  }

});
