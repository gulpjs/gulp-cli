'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var path = require('path');
var fs = require('fs');

describe('flag: --completion', function() {

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    it('returns completion script for ' + type, function(done) {
      var file = path.resolve(__dirname, '../completion', type);
      var expected = fs.readFileSync(file, 'utf8') + '\n';

      runner({ verbose: false })
        .gulp('--completion=' + type)
        .run(cb);

      function cb(err, stdout) {
        expect(stdout).toEqual(expected);
        done(err);
      }
    });
  });

  it('shows error message for unknown completion type', function(done) {
    var expected =
      'echo "gulp autocompletion rules for \'unknown\' not found"\n';

    runner({ verbose: false })
      .gulp('--completion=unknown')
      .run(cb);

    function cb(err, stdout) {
      expect(err).toExist();
      expect(stdout).toEqual(expected);
      done();
    }
  });

  it('shows error message for missing completion type', function(done) {
    runner({ verbose: false })
      .gulp('--completion')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(stderr).toMatch('Missing completion type');
      done();
    }
  });

});
