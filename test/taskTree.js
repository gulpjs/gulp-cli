'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var taskTree = require('../lib/versioned/^3.7.0/taskTree');

lab.experiment('taskTree()', function() {

  lab.test('forms a tree properly', function(done) {
    code.expect(taskTree).to.exist(); // Lol shutup jshint

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
          nodes: [
            { label: 'dep1', nodes: [], },
            { label: 'dep2', nodes: [], },
          ],
        },
        {
          label: 'test2',
          nodes: [
            { label: 'dep3', nodes: [], },
          ],
        },
        {
          label: 'test3',
          nodes: [],
        },
      ],
    };

    code.expect(taskTree(tasks)).to.deep.equal(expectTree);
    done();
  });

  lab.test('processes children recursively.', function(done) {
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
          nodes: [
            {
              label: 'test2',
              nodes: [
                {
                  label: 'test3',
                  nodes: [],
                },
              ],
            },
            {
              label: 'test3',
              nodes: [],
            },
          ],
        },
        {
          label: 'test2',
          nodes: [
            {
              label: 'dep3',
              nodes: [],
            },
          ],
        },
        {
          label: 'test3',
          nodes: [],
        },
      ],
    };

    code.expect(taskTree(tasks)).to.deep.equal(expectTree);
    done();
  });
});
