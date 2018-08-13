'use strict';

var request = require('request');

var url = 'https://gulpjs.com/plugins/blackList.json';

function parse(str, cb) {
  try {
    cb(null, JSON.parse(str));
  } catch (err) {
    cb(new Error('Invalid Blacklist JSON.'));
  }
}

// TODO: Test this impl
function getBlacklist(cb) {
  request(url, function(error, response, body) {
    processResponse(error, response, body);
  });

  function processResponse(error, response, body) {
    if (error || (response && response.statusCode !== 200)) {
      // TODO: Test different status codes
      return cb(new Error(response
        ? 'Request failed. Status Code: ' + response.statusCode
        : error));
    }

    parse(body, onParse);
  }

  function onParse(err, blacklist) {
    if (err) {
      return cb(err);
    }

    cb(null, blacklist);
  }
}

module.exports = getBlacklist;
