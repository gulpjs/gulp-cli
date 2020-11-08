'use strict';

var https = require('https');

var concat = require('concat-stream');

var format = require('theming-log').format;
var theme = require('./log/theme');
var msgs = require('./log/messages');

var url = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json';

function collect(stream, cb) {
  stream.on('error', cb);
  stream.pipe(concat(onSuccess));

  function onSuccess(result) {
    cb(null, result);
  }
}

function parse(str, cb) {
  try {
    cb(null, JSON.parse(str));
  } catch (err) {
    /* istanbul ignore next */
    cb(new Error(format(theme, msgs.error.invalidBlacklistJson)));
  }
}

// TODO: Test this impl
function getBlacklist(cb) {
  https.get(url, onRequest);

  function onRequest(res) {
    /* istanbul ignore if */
    if (res.statusCode !== 200) {
      // TODO: Test different status codes
      return cb(new Error(format(theme, msgs.error.blacklistRequestFailed, res.statusCode)));
    }

    res.setEncoding('utf8');

    collect(res, onCollect);
  }

  function onCollect(err, result) {
    /* istanbul ignore if */
    if (err) {
      return cb(err);
    }

    parse(result, onParse);
  }

  function onParse(err, blacklist) {
    /* istanbul ignore if */
    if (err) {
      return cb(err);
    }

    cb(null, blacklist);
  }
}

module.exports = getBlacklist;
