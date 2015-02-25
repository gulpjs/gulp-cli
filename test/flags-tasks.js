'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('flag: --tasks', function() {

  lab.test('prints the task list', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.contain('Tasks for');
      stdout = stdout.replace(/\\/g, '/').split('Tasks for')[1].split('\n');
      code.expect(stdout[0]).to.contain('/gulp-cli/test');
      code.expect(stdout[1]).to.contain('├── test1');
      code.expect(stdout[2]).to.contain('├─┬ test2');
      code.expect(stdout[3]).to.contain('│ └── test1');
      code.expect(stdout[4]).to.contain('├── test3');
      code.expect(stdout[5]).to.contain('└─┬ default');
      code.expect(stdout[6]).to.contain('  ├── test1');
      code.expect(stdout[7]).to.contain('  └── test3');
      done(err);
    });
  });

});
