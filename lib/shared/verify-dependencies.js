'use strict';

/**
 * Given a collection of plugin names verifies this collection against
 * the blacklist. Returns an object with:
 * [plugin name]=>[blacklisting reason]
 * or an empty object if none of the dependencies to check are blacklisted.
 *
 * @param pkg - package.json contents
 * @param blacklist - contents of the blacklist in JSON format
 */
function verifyDependencies(pkg, blacklist) {
  var pluginNames = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ].reduce(function(res, prop) {
    return res.concat(Object.keys(pkg[prop] || {}));
  }, []);

  var blacklisted = pluginNames.filter(isContainedInBlacklist)
    .reduce(function(blacklisted, pluginName) {
      blacklisted[pluginName] = blacklist[pluginName];
      return blacklisted;
    }, {});

  return blacklisted;

  function isContainedInBlacklist(pluginName) {
    return Boolean(blacklist[pluginName]);
  }
}

module.exports = verifyDependencies;
