var log = require('gulplog');
var toConsole = require('../../lib/shared/log/to-console');

var opts = require('../../lib/shared/options/parser').argv;

toConsole(log, opts);

log.debug('test debug');
log.info('test info');
log.warn('test warn');
log.error('test error');
