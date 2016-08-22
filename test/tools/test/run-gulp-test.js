'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var path = require('path');

var runner = require('../run-gulp');

lab.experiment('run gulp', { timeout: 0 }, function() {

  lab.test('Should not share properties', function(done) {
    var r1 = runner();
    var r2 = runner();

    r2._verbose = !r1._verbose;
    r2._basedir = __dirname;
    r2._command = 'xxxx';

    expect(r1._verbose).not.to.equal(r2._verbose);
    expect(r1._basedir).not.to.equal(r2._basedir);
    expect(r1._command).not.to.equal(r2._command);
    done();
  });

  lab.test('Should run gulp (verbose)', function(done) {
    runner({ verbose: true })
      .basedir(path.join(__dirname, '..'))
      .chdir('test')
      .gulp('--tasks-simple')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal('task1\ntask2\ndefault\n');
      done();
    }
  });

  lab.test('Should run gulp --cwd (verbose)', function(done) {
    runner({ verbose: true })
      .gulp('--tasks-simple --cwd tools/test')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal('task1\ntask2\ndefault\n');
      done();
    }
  });

  lab.test('Should run gulp', function(done) {
    runner()
      .chdir('tools/test')
      .gulp('--tasks-simple')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal('task1\ntask2\ndefault\n');
      done();
    }
  });

  lab.test('Should run gulp --cwd', function(done) {
    runner()
      .gulp('--tasks-simple --cwd tools/test')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal('task1\ntask2\ndefault\n');
      done();
    }
  });

});

