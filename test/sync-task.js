'use strict';

var expect = require('expect');
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;


describe('sync-task', function() {
  it('should return error code 1 if any tasks did not complete', function(done) {
    // The exit code is set to 1 by setting process.exitCode = 1 which is only supported from nodejs 0.11 on
    if (process.version.slice(0, 5) === 'v0.10') {
      this.skip();
    }

    runner({ verbose: false })
      .chdir('test/fixtures/gulpfiles')
      .gulp('test6 test7 test8')
      .run(function(err) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);
        done();
      });
  });

  it('should log tasks which did not complete', function(done) {
    runner({ verbose: false })
      .chdir('test/fixtures/gulpfiles')
      .gulp('test6 test7 test8')
      .run(function(err, stdout) {
        var lines = stdout.split('\n');
        expect(lines.length).toEqual(8);
        expect(eraseTime(lines[5])).toEqual('The following tasks did not complete: test7, test8');
        done();
      });
  });
});
