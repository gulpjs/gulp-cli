'use strict';

var https = require('https');

function getRemoteJson(url, cb) {
  var chunks = [];

  https.get(url, onRequest).on('error', onError);;

  function onRequest(res) {
    if (res.statusCode !== 200) {
      res.resume();  // Consume response data to free up memory
      return cb(new Error('Request failed. Status Code: ' + res.statusCode));
    }

    res.on('error', onError);
    res.on('data', onDrain);
    res.on('end', onEnd);
  }

  /* istanbul ignore next */
  function onError(e) {
    cb(e, null);
  }

  function onDrain(d) {
    chunks.push(d);
  }

  function onEnd() {
    try {
      cb(null, JSON.parse(Buffer.concat(chunks).toString('utf8')));
    } catch (err) {
      cb(new Error('Invalid Blacklist JSON.'));
    }
  }
}

module.exports = getRemoteJson;
