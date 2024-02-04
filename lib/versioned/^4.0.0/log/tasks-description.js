'use strict';

var format = require('theming-log').format;
var tildify = require('../../../shared/tildify');
var theme = require('../../../shared/log/theme');
var msgs = require('../../../shared/log/messages');

function getTasksDescription(env) {
  var desc;
  if (env.config.description && typeof env.config.description === 'string') {
    desc = env.config.description;
  } else {
    desc = msgs.tasks.gulpfile;
  }
  return format(theme, desc, tildify(env.configPath));
}

module.exports = getTasksDescription;
