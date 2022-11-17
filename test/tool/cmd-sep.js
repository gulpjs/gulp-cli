'use strict';

var os = require('os');

module.exports = os.platform() === 'win32' ? '&' : ';';
