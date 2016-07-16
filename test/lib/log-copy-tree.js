'use strict';

var expect = require('expect');
var copyTree = require('../../lib/shared/log/copy-tree');

describe('lib: copy-tree', function() {

  var nonConvertingNodeFactory = {
    topNode: copyNode,
    taskNode: copyNode,
    childNode: copyNode,
  };

  it('Should copy an empty tree', function(done) {
    var srcTree = {};
    var opts = {};
    var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
    expect(newTree).toEqual({ nodes: [] });
    expect(newTree).toNotBe(srcTree);
    done();
  });

  it('Should copy a tree having empty nodes', function(done) {
    var srcTree = {
      nodes: [
        {},
        { nodes: [] },
        { nodes: [{}, {}] },
      ],
    };
    var opts = {};
    var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
    expect(newTree).toEqual({
      nodes: [
        { nodes: [] },
        { nodes: [] },
        {
          nodes: [
            { nodes: [] },
            { nodes: [] },
          ],
        },
      ],
    });
    expect(newTree).toNotBe(srcTree);
    done();
  });

  it('Should copy a tree', function(done) {
    var srcTree = require('../fixtures/copy-tree');
    var opts = {};
    var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
    expect(newTree).toEqual(srcTree);
    expect(newTree).toNotBe(srcTree);
    done();
  });

  it('Should copy with no nodeFactory', function(done) {
    var srcTree = require('../fixtures/copy-tree');
    var opts = {};
    var newTree = copyTree(srcTree, opts);
    expect(newTree).toEqual(srcTree);
    expect(newTree).toNotBe(srcTree);
    done();
  });

  it('Should copy with no opts and no nodeFactory', function(done) {
    var srcTree = require('../fixtures/copy-tree');
    var newTree = copyTree(srcTree);
    expect(newTree).toEqual(srcTree);
    expect(newTree).toNotBe(srcTree);
    done();
  });

  describe('opts.depth', function() {

    it('Should copy a tree until depth 1 if the specified depth is 0',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-1');
      var opts = { depth: 0 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a tree until depth 1 if the specified depth is 1',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-1');
      var opts = { depth: 1 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a tree until depth 2 if the specified depth is 2',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-2');
      var opts = { depth: 2 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a tree until depth 3 if the specified depth is 3',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-3');
      var opts = { depth: 3 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a tree until depth 3 if the specified depth is 4',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-4');
      var opts = { depth: 4 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a full depth tree if the specified depth is too large',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-4');
      var opts = { depth: 5 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a tree until depth 1 if the specified depth < 1',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-1');
      var opts = { depth: -1 };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

    it('Should copy a full depth tree if the specified depth is not number',
    function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-depth-4');
      var opts = { depth: null };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);

      opts = { depth: 'A' };
      newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });

  });

  describe('opts.compact', function() {
    it('Should output only nodes of which `.branch` are true and those ' +
    'children', function(done) {
      var srcTree = require('../fixtures/copy-tree');
      var expectedTree = require('../expected/copy-tree/copy-tree-compact');
      var opts = { compact: true };
      var newTree = copyTree(srcTree, opts, nonConvertingNodeFactory);
      expect(newTree).toEqual(expectedTree);
      expect(newTree).toNotBe(srcTree);
      done();
    });
  });

});


function copyNode(node) {
  var obj = {};
  Object.keys(node).forEach(function(key) {
    obj[key] = node[key];
  });
  return obj;
}

