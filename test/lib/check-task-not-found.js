'use strict';

var expect = require('expect');
var normalizeError = require('../../lib/versioned/^4.0.0/normalize-error');

describe('lib: normalizeError', function() {

  it('Should return target task and similar tasks if both are included in error message', function(done) {
    var err = new Error('Task never defined: task2 - did you mean? task0, task1');
    normalizeError(err);
    expect(err).toHaveProperty('task', 'task2');
    expect(err).toHaveProperty('similar', ['task0', 'task1']);
    done();
  });

  it('Should return only target task if similar tasks is not included in error message', function(done) {
    var err = new Error('Task never defined: task2');
    normalizeError(err)
    expect(err).toHaveProperty('task', 'task2');
    expect(err).not.toHaveProperty('similar');
    done();
  });

  it('Should return undefined if error is other', function(done) {
    var err = new Error('xxx');
    normalizeError(err)
    expect(err).not.toHaveProperty('task');
    expect(err).not.toHaveProperty('similar');
    done();
  });
});
