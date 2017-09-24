'use strict';

var expect = require('expect');

var makeTitle = require('../../lib/shared/make-title');

describe('lib: make-title', function() {

  it('returns the command if no argv passed', function(done) {
    var title = makeTitle('gulp');

    expect(title).toEqual('gulp');
    done();
  });

  it('returns the command if argv is 0 length', function(done) {
    var title = makeTitle('gulp', []);

    expect(title).toEqual('gulp');
    done();
  });

  it('returns the command and argvs if not empty', function(done) {
    var title = makeTitle('gulp', ['build']);

    expect(title).toEqual('gulp build');
    done();
  });

  it('concats all argv', function(done) {
    var title = makeTitle('gulp', ['build', '--prod']);

    expect(title).toEqual('gulp build --prod');
    done();
  });
});
