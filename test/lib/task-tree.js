'use strict';

var expect = require('expect');

var taskTree = require('../../lib/versioned/^3.7.0/task-tree');

describe('lib: taskTree', function() {

  it('forms a tree properly', function(done) {
    expect(taskTree).toExist(); // Lol shutup jshint

    var tasks = {
      test: {
        dep: ['dep1', 'dep2'],
      },
      test2: {
        dep: ['dep3'],
      },
      test3: {
        dep: [],
      },
    };

    var expectTree = {
      label: 'Tasks',
      nodes: [
        {
          label: 'test',
          type: 'task',
          nodes: [
            { label: 'dep1', type: 'task', nodes: [], },
            { label: 'dep2', type: 'task', nodes: [], },
          ],
        },
        {
          label: 'test2',
          type: 'task',
          nodes: [
            { label: 'dep3', type: 'task', nodes: [], },
          ],
        },
        {
          label: 'test3',
          type: 'task',
          nodes: [],
        },
      ],
    };

    expect(taskTree(tasks)).toEqual(expectTree);
    done();
  });

  it('processes children recursively.', function(done) {
    var tasks = {
      test: {
        dep: ['test2', 'test3'],
      },
      test2: {
        dep: ['test3'],
      },
      test3: {
        dep: [],
      },
    };

    var expectTree = {
      label: 'Tasks',
      nodes: [
        {
          label: 'test',
          type: 'task',
          nodes: [
            {
              label: 'test2',
              type: 'task',
              nodes: [
                {
                  label: 'test3',
                  type: 'task',
                  nodes: [],
                },
              ],
            },
            {
              label: 'test3',
              type: 'task',
              nodes: [],
            },
          ],
        },
        {
          label: 'test2',
          type: 'task',
          nodes: [
            {
              label: 'test3',
              type: 'task',
              nodes: [],
            },
          ],
        },
        {
          label: 'test3',
          type: 'task',
          nodes: [],
        },
      ],
    };

    expect(taskTree(tasks)).toEqual(expectTree);
    done();
  });
});
