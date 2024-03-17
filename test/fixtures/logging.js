var log = require('gulplog');
var yargs = require('yargs');
var toConsole = require('../../lib/shared/log/to-console');
var cliOptions = require('../../lib/shared/options/cli-options');
var buildTranslations = require('../../lib/shared/translate');

var opts = yargs.options(cliOptions).parse();

var translate = buildTranslations();

toConsole(log, opts, translate);

log.debug('test debug');
log.info('test info');
log.warn('test warn');
log.error('test error');
