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
      nodes: [
        {
          label: 'test',
          nodes: ['dep1', 'dep2'],
        },
        {
          label: 'test2',
          nodes: ['dep3'],
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
