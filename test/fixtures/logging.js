var log = require('gulplog');
var yargs = require('yargs');
var toConsole = require('../../lib/shared/log/to-console');
var cliOptions = require('../../lib/shared/cli-options');

var parser = yargs.usage('').options(cliOptions);
var opts = parser.argv;

toConsole(log, opts);

log.debug('test debug');
log.info('test info');
log.warn('test warn');
log.error('test error');
