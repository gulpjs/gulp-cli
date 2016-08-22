'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs-extra');
var child = require('child_process');

var path = require('path');
var outfile = path.resolve(__dirname, 'output/flags-help.out');

var output = fs.readFileSync(__dirname + '/expected/flags-help.txt', 'utf8').replace(/(\r\n|\n|\r)\s?/gm,'\n');

lab.experiment('flag: --help', function() {

  lab.before(function(done) {
    fs.mkdirpSync(path.resolve(__dirname, 'output'));
    done();
  });

  lab.after(function(done) {
    fs.removeSync(path.resolve(__dirname, 'output'));
    done();
  });

  lab.test('shows help using --help', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --help --cwd ./test/fixtures/gulpfiles > ' + outfile, function(err) {
      var stdout = fs.readFileSync(outfile, { encoding: 'utf8' });
      code.expect(stdout.replace(/(\r\n|\n|\r)\s?/gm,'\n')).to.equals(output);
      done(err);
    });
  });

  lab.test('shows help using short --h', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --h --cwd ./test/fixtures/gulpfiles > ' + outfile, function(err) {
      var stdout = fs.readFileSync(outfile, { encoding: 'utf8' });
      code.expect(stdout.replace(/(\r\n|\n|\r)\s?/gm,'\n')).to.equals(output);
      done(err);
    });
  });

});
