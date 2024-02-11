'use strict';

var format = require('theming-log').format;
var tildify = require('../../../shared/tildify');
var theme = require('../../../shared/log/theme');
var msgs = require('../../../shared/log/messages');

function getTasksDescription(env, isBackslashEscaping) {
  var desc;
  if (env.config.description && typeof env.config.description === 'string') {
    desc = env.config.description;
  } else {
    desc = msgs.tasks.gulpfile;
  }
  var gulpfile = tildify(env.configPath);
  if (isBackslashEscaping) {
    gulpfile = escapeBackslash(gulpfile);
  }
  return format(theme, desc, gulpfile);
}

function escapeBackslash(s) {
  return s.replace(/\\/g, '\\\\');
}

module.exports = getTasksDescription;
