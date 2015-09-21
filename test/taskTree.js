'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var taskTree = require('../lib/taskTree');

lab.experiment('taskTree()', function() {

  lab.test('forms a tree properly', function(done) {
    code.expect(taskTree).to.exist(); // Lol shutup jshint

    var tasks = {
      test: {
        dep: ['abc', 'def'],
      },
      abc: {
        dep: ['def'],
      },
      def: {
        dep: [],
      },
    };

    var expectTree =  {
       nodes: [
         {
           label: 'test',
           nodes: [
             {
               label: 'abc',
             nodes: [
                 {
                   label: 'def',
                   nodes:
           []
                 }
               ]
         },
         {
           label: 'def',
               nodes: []
             }
           ]
         },
         {
           label: 'abc',
           nodes: [
             {
               label: 'def',
               nodes:
           []
             }
           ]
         },
         {
           label: 'def',
           nodes: []
         }
       ]
     };

    code.expect(taskTree(tasks)).to.deep.equal(expectTree);
    done();
  });
});
