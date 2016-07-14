'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');
var fs = require('fs');
var path = require('path');
var child = require('child_process');

var expectedFiles = [
  path.join(__dirname, 'expected/flags-tasks.txt'),
  path.join(__dirname, 'expected/flags-tasks/with-desc-and-flags.txt'),
  path.join(__dirname, 'expected/flags-tasks/by-unwrap-and-not-by-unwrap.txt'),
];

var outputs = [];
expectedFiles.forEach(function(file, i) {
  outputs[i] = fs.readFileSync(file, 'utf8').replace(/(\r\n|\n|\r)/gm,'\n');
});

lab.experiment('flag: --tasks', function() {

  lab.test('prints the task list', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.contain('Tasks for');
      stdout = stdout.replace(/\\/g, '/').split('Tasks for')[1].split('\n');
      var outputArray = outputs[0].split('\n');
      for (var i = 0; i < stdout.length; i++) {
        code.expect(stdout[i]).to.contain(outputArray[i]);
      }
      done(err);
    });
  });

  lab.test('prints the task list with description and flags', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --gulpfile ./test/fixtures/flags-tasks/with-desc-and-flags.js --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.contain('Tasks for');
      stdout = stdout.replace(/\\/g, '/').split('Tasks for')[1].split('\n');
      var outputArray = outputs[1].split('\n');
      for (var i = 0; i < stdout.length; i++) {
        code.expect(stdout[i]).to.contain(outputArray[i]);
      }
      done(err);
    });
  });

  lab.test('prints the task list by gulp.task(s).unwrap and gulp.task(s)', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks --gulpfile ./test/fixtures/flags-tasks/by-unwrap-and-not-by-unwrap.js --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.contain('Tasks for');
      stdout = stdout.replace(/\\/g, '/').split('Tasks for')[1].split('\n');
      var outputArray = outputs[2].split('\n');
      for (var i = 0; i < stdout.length; i++) {
        code.expect(stdout[i]).to.contain(outputArray[i]);
      }
      done(err);
    });
  });
});
