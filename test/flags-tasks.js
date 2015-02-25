'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('flag: --tasks', function () {

  lab.test('prints the task list', function (done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --cwd ./test/fixtures', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/');
      code.expect(stdout).to.contain('/gulp-cli/test');
      code.expect(stdout).to.contain('├── test1');
      code.expect(stdout).to.contain('├── test2');
      code.expect(stdout).to.contain('├── test3');
      code.expect(stdout).to.contain('└── default');
      done(err);
    });
  });

});
