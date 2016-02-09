'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');
var fs = require('fs');
var child = require('child_process');

var output = fs.readFileSync(__dirname + '/expected/tasks-as-exports.txt', 'utf8').replace(/(\r\n|\n|\r)/gm,'\n');

// Long timeout is required because parse time is slow
lab.experiment('exports as tasks', { timeout: 0 }, function() {

  lab.test('prints the task list', function(done) {

    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --gulpfile "./test/fixtures/gulpfile-exports.babel.js"', function(err, stdout) {
      code.expect(stdout).to.contain('Tasks for');
      stdout = stdout.replace(/\\/g, '/').split('Tasks for')[1].split('\n');
      var outputArray = output.split('\n');
      for (var i = 0; i < stdout.length; i++) {
        code.expect(stdout[i]).to.contain(outputArray[i]);
      }
      done(err);
    });
  });

});
