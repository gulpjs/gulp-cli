'use strict';

var skipLines = require('../skip-lines');

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;

lab.experiment('skip lines', function() {

  lab.test('an empty string', function(done) {
    expect(skipLines('', 0)).to.equal('');
    expect(skipLines('', 1)).to.equal('');
    expect(skipLines('', 2)).to.equal('');
    done();
  });

  lab.test('an string which has single line', function(done) {
    expect(skipLines('single line', 0)).to.equal('single line');
    expect(skipLines('single line', 1)).to.equal('');
    expect(skipLines('single line', 2)).to.equal('');
    done();
  });

  lab.test('an string which has multiple lines', function(done) {
    expect(skipLines('foo\nbar\nbaz', 0)).to.equal('foo\nbar\nbaz');
    expect(skipLines('foo\nbar\nbaz', 1)).to.equal('bar\nbaz');
    expect(skipLines('foo\nbar\nbaz', 2)).to.equal('baz');
    done();
  });

});
