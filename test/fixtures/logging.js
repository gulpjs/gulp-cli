var log = require('gulplog');
var yargs = require('yargs');
var toConsole = require('../../lib/shared/log/toConsole');
var cliOptions = require('../../lib/shared/cliOptions');

var parser = yargs.usage('', cliOptions);
var opts = parser.argv;

toConsole(log, opts);

log.debug('test debug');
log.info('test info');
log.warn('test warn');
log.error('test error');
