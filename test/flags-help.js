'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

var output = fs.readFileSync(__dirname + '/expected/flags-help.txt', 'utf8').replace(/(\r\n|\n|\r)/gm,'');

lab.experiment('flag: help', function() {

  lab.test('shows help using --help', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --help --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout.replace(/(\r\n|\n|\r)/gm,'')).to.equals(output);
      done(err);
    });
  });

  lab.test('shows help using short --h', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --h --cwd ./test/fixtures', function(err, stdout) {
      code.expect(stdout.replace(/(\r\n|\n|\r)/gm,'')).to.equals(output);
      done(err);
    });
  });

});
