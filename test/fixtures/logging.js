var log = require('gulplog');
var yargs = require('yargs');
var format = require('theming-log').format;
var setLogLevels = require('../../lib/shared/log/log-levels');
var setLogTheme = require('../../lib/shared/log/theming');
var cliOptions = require('../../lib/shared/cli-options');

var parser = yargs.usage('', cliOptions);
var opts = parser.argv;

setLogLevels(log, opts);


var theme = {
  INFO: function(v) { return '(!) ' + v; },
  WARN: function(v) { return format(theme, '{MSG: (warning) {1}}', v); },
  ERROR: '{MSG: **error** {1}}',
  MSG: function(v) { return v; },
};

setLogTheme(log, theme);

log.debug('{DEBUG: test debug}');
log.info('{INFO: test info - {1}}', 'foo');
log.warn('{WARN: test warn}');
log.error('{ERROR: test error: {1}}', 'E001');
