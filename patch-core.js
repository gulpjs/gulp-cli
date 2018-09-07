'use strict';

/** **********************************************************************
 * copied from "https://github.com/TooTallNate/node-agent-base"
 * (as soon as https-proxy-agent >= 2.2.1 is used / support for node <= 4
 * is dropped, this patch can be removed, since it is part of the proxy
 * implementation)
 *************************************************************************/

var url = require('url');
var https = require('https');

// ponyfill for Object.assign()
var objectAssign = require('object-assign');

/**
 * This currently needs to be applied to all Node.js versions
 * in order to determine if the `req` is an HTTP or HTTPS request.
 *
 * There is currently no PR attempting to move this property upstream.
 */
https.request = (function(request) {
  return function(_options, cb) {
    var options;
    if (typeof _options === 'string') {
      options = url.parse(_options);
    } else {
      options = objectAssign({}, _options);
    }
    if (null == options.port) {
      options.port = 443;
    }
    options.secureEndpoint = true;
    return request.call(https, options, cb);
  };
})(https.request);

/**
 * This is needed for Node.js >= 9.0.0 to make sure `https.get()` uses the
 * patched `https.request()`.
 *
 * Ref: https://github.com/nodejs/node/commit/5118f31
 */
https.get = function(options, cb) {
  var req = https.request(options, cb);
  req.end();
  return req;
};
