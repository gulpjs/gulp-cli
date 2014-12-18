'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

var output = fs.readFileSync(__dirname + '/expected/flags-tasks-simple.txt', 'utf8');

lab.experiment('flag: --tasks-simple', function () {

  lab.test('prints the task list', function (done) {
    child.exec(__dirname + '/../index.js --tasks-simple --cwd ./test', function(err, stdout) {
      code.expect(stdout).to.equal(output);
      done(err);
    });
  });

});
