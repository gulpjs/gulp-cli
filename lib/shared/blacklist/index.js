'use strict';

var getRemoteJson = require('./get-remote-json');

var url = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json';

function getBlacklist(cb) {
  getRemoteJson(url, cb);
}

module.exports = getBlacklist;
