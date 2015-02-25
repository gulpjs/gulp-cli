'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

var output = fs.readFileSync(__dirname + '/expected/flags-tasks-simple.txt', 'utf8').replace(/\r\n/g, '\n');

lab.experiment('flag: --tasks-simple', function () {

  lab.test('prints the task list in simple format', function (done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks-simple --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout).to.equal(output);
      done(err);
    });
  });

});
