'use strict';

var expect = require('expect');
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

describe('sync-task', function() {
  it('should log tasks which did not complete', function(done) {
    runner({ verbose: false })
      .chdir('test/fixtures/gulpfiles')
      .gulp('test6 test7 test8')
      .run(function(err, stdout) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);

        var lines = stdout.split('\n');
        expect(lines.length).toEqual(8);
        expect(eraseTime(lines[5])).toEqual('The following tasks did not complete: test7, test8');
        done();
      });
  });
});
