'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;

describe('flag: --silent', function() {

  it('prints nothing when silent flag is set', function(done) {
    runner({ verbose: false })
      .gulp('--silent', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).toEqual('');
      done(err);
    }
  });

});
