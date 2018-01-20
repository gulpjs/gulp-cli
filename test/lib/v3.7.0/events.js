'use strict';

var expect = require('expect');
var EventEmitter = require('events').EventEmitter;
var os = require('os');
var log = require('gulplog');
var Semver = require('sver-compat').Semver;
var ansi = require('../../../lib/shared/ansi');

var logEvents = require('../../../lib/versioned/^3.7.0/log/events');

var infoBuf = [];
log.info = function() {
  infoBuf.push([].join.call(arguments, ' '));
};
var warnBuf = [];
log.warn = function() {
  warnBuf.push([].join.call(arguments, ' '));
};
var errorBuf = [];
log.error = function() {
  errorBuf.push([].join.call(arguments, ' '));
};

function noColor(v) {
  return v;
}
var ansiOrig = {};

var origExit = process.exit;
var origOnce = process.once;

var tmpProcess = new EventEmitter();

// See https://www.appveyor.com/docs/lang/nodejs-iojs/#garbled-or-missing-output
function isGarbledOrMissingOutput() {
  if (os.platform() === 'win32') {
    var currentVersion = new Semver(process.versions.node);
    var minimalVersion = new Semver('0.11.12');
    return currentVersion.lt(minimalVersion);
  }
  return false;
}

describe('lib: ^3.7.0/log/events', function() {
  before(function() {
    Object.keys(ansi).forEach(function(color) {
      ansiOrig[color] = ansi[color];
      ansi[color] = noColor;
    });
  });
  after(function() {
    Object.keys(ansi).forEach(function(color) {
      ansi[color] = ansiOrig[color];
    });
  });
  beforeEach(function() {
    process.exit = function() {
      expect(true).toBe(false);
    };
    process.once = tmpProcess.once.bind(tmpProcess);
    infoBuf = [];
    warnBuf = [];
    errorBuf = [];
  });
  afterEach(function() {
    process.exit = origExit;
    process.once = origOnce;
  });

  describe('"exit" event', function() {
    it('Should not call process.exit when no error', function(done) {
      var ee = new EventEmitter();
      logEvents(ee);
      tmpProcess.emit('exit', 0);
      expect(infoBuf).toEqual([]);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([]);
      done();
    });
  });

  describe('"err" event', function() {
    it('Should call process.exit with exit code 1 when error', function(done) {
      process.exit = function(code) {
        if (!isGarbledOrMissingOutput()) {
          expect(code).toBe(1);
          done();
        }
      };

      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('err');
      tmpProcess.emit('exit', 0);
      expect(infoBuf).toEqual([]);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([]);

      if (isGarbledOrMissingOutput()) {
        done();
      }
    });

    it('Should not call process.exit when already exit code is not zero', function(done) {
      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('err');
      tmpProcess.emit('exit', 1);
      expect(infoBuf).toEqual([]);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([]);
      done();
    });
  });

  describe('"task_start" and "task_stop" events', function() {
    it('Should output logs for starting and finishing a task', function(done) {
      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_start', { task: 'task-0' });
      ee.emit('task_stop', { task: 'task-0', hrDuration: [0, 12] });
      tmpProcess.emit('exit', 0);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([]);
      expect(infoBuf).toEqual([
        'Starting \'task-0\'...',
        'Finished \'task-0\' after 12 ns',
      ]);
      done();
    });

    it('Should exit without error if there is no incomplete task', function(done) {
      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_start', { task: 'task-0' });
      ee.emit('task_start', { task: 'task-1' });
      ee.emit('task_start', { task: 'task-2' });
      ee.emit('task_stop', { task: 'task-2', hrDuration: [0, 12] });
      ee.emit('task_start', { task: 'task-3' });
      ee.emit('task_stop', { task: 'task-1', hrDuration: [0, 12] });
      ee.emit('task_stop', { task: 'task-3', hrDuration: [0, 12] });
      ee.emit('task_stop', { task: 'task-0', hrDuration: [0, 12] });
      tmpProcess.emit('exit', 0);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([]);
      expect(infoBuf).toEqual([
        'Starting \'task-0\'...',
        'Starting \'task-1\'...',
        'Starting \'task-2\'...',
        'Finished \'task-2\' after 12 ns',
        'Starting \'task-3\'...',
        'Finished \'task-1\' after 12 ns',
        'Finished \'task-3\' after 12 ns',
        'Finished \'task-0\' after 12 ns',
      ]);
      done();
    });

    it('Should exit with warning log if there are incomplete tasks', function(done) {
      process.exit = function(code) {
        if (!isGarbledOrMissingOutput()) {
          expect(code).toBe(1);
          done();
        }
      };

      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_start', { task: 'task-0' });
      ee.emit('task_start', { task: 'task-2' });
      ee.emit('task_start', { task: 'task-1' });
      ee.emit('task_start', { task: 'task-3' });
      tmpProcess.emit('exit', 0);
      expect(errorBuf).toEqual([]);
      expect(infoBuf).toEqual([
        'Starting \'task-0\'...',
        'Starting \'task-2\'...',
        'Starting \'task-1\'...',
        'Starting \'task-3\'...',
      ]);
      expect(warnBuf).toEqual([
        'The following tasks did not complete: task-0, task-2, task-1, task-3',
        'Did you forget to signal async completion?',
      ]);

      if (isGarbledOrMissingOutput()) {
        done();
      }
    });

    it('Should exit with warning log if there are incomplete tasks (2)', function(done) {
      process.exit = function(code) {
        if (!isGarbledOrMissingOutput()) {
          expect(code).toBe(1);
          done();
        }
      };

      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_start', { task: 'task-0' });
      ee.emit('task_start', { task: 'task-2' });
      ee.emit('task_start', { task: 'task-1' });
      ee.emit('task_stop', { task: 'task-2', hrDuration: [0, 12] });
      ee.emit('task_start', { task: 'task-3' });
      ee.emit('task_stop', { task: 'task-3', hrDuration: [0, 12] });
      tmpProcess.emit('exit', 0);
      expect(errorBuf).toEqual([]);
      expect(infoBuf).toEqual([
        'Starting \'task-0\'...',
        'Starting \'task-2\'...',
        'Starting \'task-1\'...',
        'Finished \'task-2\' after 12 ns',
        'Starting \'task-3\'...',
        'Finished \'task-3\' after 12 ns',
      ]);
      expect(warnBuf).toEqual([
        'The following tasks did not complete: task-0, task-1',
        'Did you forget to signal async completion?',
      ]);

      if (isGarbledOrMissingOutput()) {
        done();
      }
    });
  });

  describe('"task_err" event', function() {
    it('Should output log for unfound task', function(done) {
      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_err', {
        task: 'task-0',
        hrDuration: [0, 12],
        message: 'Error Message',
      });
      expect(infoBuf).toEqual([]);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([
        '\'task-0\' errored after 12 ns',
        'Error Message',
      ]);
      done();
    });
  });

  describe('"task_not_found" event', function() {
    it('Should output log for unfound task and call process.exit', function(done) {
      process.exit = function(code) {
        if (!isGarbledOrMissingOutput()) {
          expect(code).toBe(1);
          done();
        }
      };

      var ee = new EventEmitter();
      logEvents(ee);
      ee.emit('task_not_found', { task: 'task-0' });
      expect(infoBuf).toEqual([]);
      expect(warnBuf).toEqual([]);
      expect(errorBuf).toEqual([
        'Task \'task-0\' is not in your gulpfile',
        'Please check the documentation for proper gulpfile formatting',
      ]);

      if (isGarbledOrMissingOutput()) {
        done();
      }
    });
  });

});

