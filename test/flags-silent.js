'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;

lab.experiment('flag: --silent', function() {

  lab.test('prints nothing when silent flag is set', function(done) {
    runner({ verbose: false })
      .gulp('--silent', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal('');
      done(err);
    }
  });

});
