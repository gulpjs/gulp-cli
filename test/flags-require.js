'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var fs = require('fs');
var child = require('child_process');

lab.experiment('flag: --require', function() {
  lab.test('requires module before running gulpfile');
});
