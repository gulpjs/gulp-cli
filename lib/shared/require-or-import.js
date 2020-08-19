'use strict';

var pathToFileURL = require('url').pathToFileURL;
var pathStatsSync = require('fs').lstatSync;
var join = require('path').join;

var importESM;
try {
  // Node.js <10 errors out with a SyntaxError when loading a script that uses import().
  // So a function is dynamically created to catch the SyntaxError at runtime instead of parsetime.
  // That way we can keep supporting all Node.js versions all the way back to 0.10.
  importESM = new Function('id', 'return import(id);');
} catch (e) {
  importESM = null;
}

function securePath(path) {
  var pathStatsSync = require('fs').lstatSync;
  var join = require('path').join;

  // Avoid ERR_UNSUPPORTED_DIR_IMPORT (>=NodeJs 12)
  var validPath = pathStatsSync(path).isDirectory() ?
    join(path, 'index.mjs') :
    path;

  // This is needed on Windows, because import() fails if providing a Windows file path.
  return pathToFileURL(validPath);
}

function onImportESM(path, callback) {
  var safePath = securePath(path);
  importESM(safePath)
    .then(function(modules) {
      callback(null, modules);
    })
    .catch(callback);
}

function requireOrImport(path, callback) {
  var err = null;
  var cjs;
  try {
    cjs = require(path);
  } catch (e) {
    if (pathToFileURL && importESM && e.code === 'ERR_REQUIRE_ESM') {
      return onImportESM(path, callback);
    }
    err = e;
  }
  process.nextTick(function () { callback(err, cjs); });
}

module.exports = requireOrImport;
