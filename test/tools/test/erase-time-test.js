'use strict';

var eraseTime = require('../erase-time');

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;

lab.experiment('erase time', function() {

  lab.test('an empty string', function(done) {
    expect(eraseTime('')).to.equals('');
    done();
  });

  lab.test('a string with no time', function(done) {
    expect(eraseTime(' foo \n bar \n baz ')).to.equals(' foo \n bar \n baz ');
    done();
  });

  lab.test('a string with time', function(done) {
    expect(eraseTime('[10:20:30]  foo \n[10:20:30]  bar \n[10:20:30]  baz '))
      .to.equals(' foo \n bar \n baz ');
    done();
  });

  lab.test('a string with time and various eol', function(done) {
    expect(eraseTime('[10:20:30]  foo \r\n[10:20:30]  bar \r[10:20:30]  baz '))
      .to.equals(' foo \n bar \n baz ');
    done();
  });
});
