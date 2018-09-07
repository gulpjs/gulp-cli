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

  describe('proxy with mock proxy server', function() {
    var proxyServer;

    before(function(done) {
      proxyServer = createProxyServerNew();
      proxyServer.listen(proxyPort, function() {
        done();
      });
    });

    after(function(done) {
      proxyServer.once('close', function() {
        done();
      });
      proxyServer.close();
    });

    it('proxy config with url', function(done) {
      testProxyImplementation('proxy-url', function(err, stdout, stderr) {
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
      });
    });

    it('proxy config with object', function(done) {
      testProxyImplementation('proxy-object', function(err, stdout, stderr) {
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
      });
    });
  });

  it('proxy server not reachable', function(done) {
    testProxyImplementation('proxy-url', function(err, stdout, stderr) {
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
          path.resolve('./test/fixtures/verify/invalid-package.json') +
          '\n'
      );
      done();
    });
  });

  function testProxyImplementation(proxyFixture, cb) {
    if (proxyFixture !== 'proxy-object' && proxyFixture !== 'proxy-url') {
      assert.fail('invalid value for parameter "proxyFixture" (expected "proxy-object" or "proxy-url", but got ' + proxyFixture + ')');
    }
    runner({ verbose: false })
      .gulp('--verify ../../../verify/invalid-package.json', '--cwd ./test/fixtures/config/flags/' + proxyFixture + '/')
      .run(cb);
  }

  function createProxyServerNew() {
    var proxy = http.createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('okay');
    });

    proxy.on('connection', function(socket) {
      socket.on('error', function() {
        // ECONNRESET happens on node 10
        // -> ignore it, because it only happens during the unittests
        // it might be some implementation issue with the mock proxy implementation
      });
    });

    proxy.on('connect', onConnect);
    proxy.on('error', onError);

    function onConnect(req, cltSocket, head) {

      expect(req.method).toBe('CONNECT');
      expect(req.url).toEqual('gulpjs.com:443');

      var srvSocket = net.connect(443, 'gulpjs.com', function() {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                        'Proxy-agent: Node.js-Proxy\r\n' +
                        '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
      });

      srvSocket.on('error', function(error) {
        assert.fail('error in srvSocket (' + JSON.stringify(error) + ')');
      });
    }

    function onError(error) {
      assert.fail('could not start proxy server (' + JSON.stringify(error) + ')');
    }

    return proxy;
  }

});
