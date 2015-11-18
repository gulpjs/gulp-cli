'use strict';

var fs = require('fs-extra');
var path = require('path');
var tildify = require('tildify');
var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');
var output = require('./expected/flags-tasks-json.json')

lab.experiment('flag: --tasks-json', function() {

  var outputString = JSON.stringify(output).replace(/{{path}}/, tildify(path.join(__dirname, 'fixtures/gulpfile.js')));
  var expected = JSON.parse(outputString);

  lab.test('prints the task list with no args', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --tasks-json --gulpfile "./test/fixtures/gulpfile.js" ', function(err, stdout) {
      stdout = stdout.replace(/\\/g, '/').split('\n');
      var parsedJson = JSON.parse(stdout[1]);
      code.expect(parsedJson).to.deep.equal(expected);
      done(err);
    });
  });

  lab.test('writes the task list to file with path', function(done) {
    fs.emptyDir(__dirname + '/output/', function(err) {
      if (err) {
        return done(err);
      }

      child.exec('node ' + __dirname + '/../bin/gulp.js --tasks-json "../output/tasks.json" --gulpfile "./test/fixtures/gulpfile.js" ', function(err, stdout) {
        var file = fs.readFileSync(__dirname + '/output/tasks.json', 'utf8')
        var parsedJson = JSON.parse(file);
        code.expect(parsedJson).to.deep.equal(expected);
        fs.removeSync(__dirname + '/output/')
        done(err);
      });
    });
  });
});
