'use strict';

var expect = require('expect');
var getRemoteJson = require('../../lib/shared/blacklist/get-remote-json');

describe('lib: blacklist/get-remote-json', function() {

  it('should get normal json', function(done) {
    var url = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json';
    getRemoteJson(url, function(err, json) {
      expect(err).toBeNull();
      expect(json['gulp-blink']).toEqual('deprecated. use `blink` instead.');
      done();
    });
  });

  it('should get error when 404', function(done) {
    var url = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/xxx.json';
    getRemoteJson(url, function(err, json) {
      expect(err.message).toEqual('Request failed. Status Code: 404');
      expect(json).toBeFalsy();
      done();
    });
  });

  it('should get error when not json', function(done) {
    var url = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/README.md';
    getRemoteJson(url, function(err, json) {
      expect(err.message).toEqual('Invalid Blacklist JSON.');
      expect(json).toBeFalsy();
      done();
    });
  });
});
