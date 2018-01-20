'use strict';

var expect = require('expect');
var PluginError = require('plugin-error');

var formatError = require('../../../lib/versioned/^3.7.0/format-error');

describe('lib: ^3.7.0/format-error', function() {

  it('Should return error message when error is not orchestrator error', function(done) {
    var err = new TypeError('ERROR!');
    expect(formatError(err)).toEqual('ERROR!');
    done();
  });

  it('Should return error message when PluginError', function(done) {
    var err = new PluginError('test', 'something broke');
    expect(formatError({ task: 'task-0', err: err })).toEqual(err.toString());
    done();
  });

  it('Should return error message when normal error', function(done) {
    var err = new TypeError('ERROR!');
    expect(formatError({ task: 'task-0', err: err })).toEqual(err.stack);
    done();
  });

  it('Should return error message when unknown error', function(done) {
    var stack = formatError({ task: 'task-0', err: 'abc' });
    expect(stack.split(/\r\n|\r|\n/)[0]).toEqual('Error: abc');
    done();
  });
});

