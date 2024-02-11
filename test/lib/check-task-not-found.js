'use strict';

var expect = require('expect');
var checkTaskNotFound = require('../../lib/versioned/^4.0.0/log/check-task-not-found');

describe('lib: checkTaskNotFound', function() {

  it('Should return target task and similar tasks if both are included in error message', function(done) {
    var err = new Error('Task never defined: task2 - did you mean? task0, task1');
    expect(checkTaskNotFound(err)).toEqual({
      target: 'task2',
      similar: 'task0, task1',
    });
    done();
  });

  it('Should return only target task if similar tasks is not included in error message', function(done) {
    var err = new Error('Task never defined: task2');
    expect(checkTaskNotFound(err)).toEqual({ target: 'task2' });
    done();
  });

  it('Should return undefined if error is other', function(done) {
    var err = new Error('xxx');
    expect(checkTaskNotFound(err)).toBeUndefined();
    done();
  });
});
