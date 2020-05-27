'use strict';

var pathToFileURL = require('url').pathToFileURL;

var importESM;
try {
  importESM = new Function('id', 'return import(id);');
} catch (e) {
  importESM = null;
}

function requireOrImport(path, callback) {
  var err = null;
  var cjs;
  try {
    cjs = require(path);
  } catch (e) {
    if (pathToFileURL && importESM && e.code === 'ERR_REQUIRE_ESM') {
      var url = pathToFileURL(path);
      importESM(url).then(function(esm) { callback(null, esm); }, callback);
      return;
    }
    err = e;
  }
  process.nextTick(function() { callback(err, cjs); });
}

module.exports = requireOrImport;
