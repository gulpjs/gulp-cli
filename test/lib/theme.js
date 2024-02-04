'use strict';

var expect = require('expect');
var format = require('theming-log').format;
var theme = require('../../lib/shared/log/theme');

describe('lib: theme', function() {

  it('styles', function(done) {
    if (process.env.CI) {
      this.skip();
      return;
    }

    expect(theme.reset('hello', 'world')).toEqual('\x1B[0mhello world\x1B[0m');
    expect(theme.bold('hello', 'world')).toEqual('\x1B[1mhello world\x1B[22m');
    expect(theme.dim('hello', 'world')).toEqual('\x1B[2mhello world\x1B[22m');
    expect(theme.italic('hello', 'world')).toEqual('\x1B[3mhello world\x1B[23m');
    expect(theme.underline('hello', 'world')).toEqual('\x1B[4mhello world\x1B[24m');
    expect(theme.inverse('hello', 'world')).toEqual('\x1B[7mhello world\x1B[27m');
    expect(theme.hidden('hello', 'world')).toEqual('\x1B[8mhello world\x1B[28m');
    expect(theme.strikethrough('hello', 'world')).toEqual('\x1B[9mhello world\x1B[29m');
    expect(theme.visible('hello', 'world')).toEqual('hello world');

    expect(theme.black('hello', 'world')).toEqual('\x1B[30mhello world\x1B[39m');
    expect(theme.red('hello', 'world')).toEqual('\x1B[31mhello world\x1B[39m');
    expect(theme.green('hello', 'world')).toEqual('\x1B[32mhello world\x1B[39m');
    expect(theme.yellow('hello', 'world')).toEqual('\x1B[33mhello world\x1B[39m');
    expect(theme.blue('hello', 'world')).toEqual('\x1B[34mhello world\x1B[39m');
    expect(theme.magenta('hello', 'world')).toEqual('\x1B[35mhello world\x1B[39m');
    expect(theme.cyan('hello', 'world')).toEqual('\x1B[36mhello world\x1B[39m');
    expect(theme.white('hello', 'world')).toEqual('\x1B[37mhello world\x1B[39m');
    expect(theme.blackBright('hello', 'world')).toEqual('\x1B[90mhello world\x1B[39m');
    expect(theme.gray('hello', 'world')).toEqual('\x1B[90mhello world\x1B[39m');
    expect(theme.grey('hello', 'world')).toEqual('\x1B[90mhello world\x1B[39m');
    expect(theme.redBright('hello', 'world')).toEqual('\x1B[91mhello world\x1B[39m');
    expect(theme.greenBright('hello', 'world')).toEqual('\x1B[92mhello world\x1B[39m');
    expect(theme.yellowBright('hello', 'world')).toEqual('\x1B[93mhello world\x1B[39m');
    expect(theme.blueBright('hello', 'world')).toEqual('\x1B[94mhello world\x1B[39m');
    expect(theme.magentaBright('hello', 'world')).toEqual('\x1B[95mhello world\x1B[39m');
    expect(theme.cyanBright('hello', 'world')).toEqual('\x1B[96mhello world\x1B[39m');
    expect(theme.whiteBright('hello', 'world')).toEqual('\x1B[97mhello world\x1B[39m');

    expect(theme.bgBlack('hello', 'world')).toEqual('\x1B[40mhello world\x1B[49m');
    expect(theme.bgRed('hello', 'world')).toEqual('\x1B[41mhello world\x1B[49m');
    expect(theme.bgGreen('hello', 'world')).toEqual('\x1B[42mhello world\x1B[49m');
    expect(theme.bgYellow('hello', 'world')).toEqual('\x1B[43mhello world\x1B[49m');
    expect(theme.bgBlue('hello', 'world')).toEqual('\x1B[44mhello world\x1B[49m');
    expect(theme.bgMagenta('hello', 'world')).toEqual('\x1B[45mhello world\x1B[49m');
    expect(theme.bgCyan('hello', 'world')).toEqual('\x1B[46mhello world\x1B[49m');
    expect(theme.bgWhite('hello', 'world')).toEqual('\x1B[47mhello world\x1B[49m');
    expect(theme.bgBlackBright('hello', 'world')).toEqual('\x1B[100mhello world\x1B[49m');
    expect(theme.bgGray('hello', 'world')).toEqual('\x1B[100mhello world\x1B[49m');
    expect(theme.bgGrey('hello', 'world')).toEqual('\x1B[100mhello world\x1B[49m');
    expect(theme.bgRedBright('hello', 'world')).toEqual('\x1B[101mhello world\x1B[49m');
    expect(theme.bgGreenBright('hello', 'world')).toEqual('\x1B[102mhello world\x1B[49m');
    expect(theme.bgYellowBright('hello', 'world')).toEqual('\x1B[103mhello world\x1B[49m');
    expect(theme.bgBlueBright('hello', 'world')).toEqual('\x1B[104mhello world\x1B[49m');
    expect(theme.bgMagentaBright('hello', 'world')).toEqual('\x1B[105mhello world\x1B[49m');
    expect(theme.bgCyanBright('hello', 'world')).toEqual('\x1B[106mhello world\x1B[49m');
    expect(theme.bgWhiteBright('hello', 'world')).toEqual('\x1B[107mhello world\x1B[49m');

    done();
  });

  it('templates', function(done) {
    if (process.env.CI) {
      this.skip();
      return;
    }

    /* eslint new-cap: 0 */
    expect(theme.NOW('HH:mm')).toMatch(/^\d{2}:\d{2}$/);

    expect(format(theme, '{HELP.DESC: {1}}', 'hello')).toEqual('\x1B[90mhello\x1B[39m');
    expect(format(theme, '{DESC: {1}}', 'hello')).toEqual('hello');
    expect(format(theme, '{PATH: {1}}', 'hello')).toEqual('\x1B[35mhello\x1B[39m');
    expect(format(theme, '{PID: {1}}', 'hello')).toEqual('\x1B[35mhello\x1B[39m');
    expect(format(theme, '{MODULE: {1}}', 'hello')).toEqual('\x1B[35mhello\x1B[39m');
    expect(format(theme, '{VERSION: {1}}', 'hello')).toEqual('hello');
    expect(format(theme, '{TITLE: {1}}', 'hello')).toEqual('\x1B[1mhello\x1B[22m');
    expect(format(theme, '{TASK: {1}}', 'hello')).toEqual('\x1B[36mhello\x1B[39m');
    expect(format(theme, '{OPTION: {1}}', 'hello')).toEqual('\x1B[34mhello\x1B[39m');
    expect(format(theme, '{DURATION: {1}}', 'hello')).toEqual('\x1B[35mhello\x1B[39m');

    expect(format(theme, '{TASKS.BRANCH: {1}}', 'hello')).toEqual('hello');
    expect(format(theme, '{TASKS.NAME: {1}}', 'hello')).toEqual('\x1B[36mhello\x1B[39m');
    expect(format(theme, '{TASKS.OPTION: {1}}', 'hello')).toEqual('\x1B[34mhello\x1B[39m');
    expect(format(theme, '{TASKS.DESC: {1}}', 'hello')).toEqual('hello');
    expect(format(theme, '{TASKS.CHILD: {1}}', 'hello')).toEqual('hello');

    expect(format(theme, '{INFO: {1}}', 'hello')).toEqual('hello');
    expect(format(theme, '{WARN: {1}}', 'hello')).toEqual('\x1B[33mhello\x1B[39m');
    expect(format(theme, '{ERROR: {1}}', 'hello')).toEqual('\x1B[31mhello\x1B[39m');

    /* eslint no-control-regex: 0 */
    expect(format(theme, '{TIMESTAMP: {1}}', 'HH:mm:ss')).toMatch(/^\[\x1B\[90m\d{2}:\d{2}:\d{2}\x1B\[39m\] $/);

    expect(format(theme, '{IF: {1}?{2}}', true, 'hello')).toEqual('hello');
    expect(format(theme, '{IF: {1}?{2}}', false, 'hello')).toEqual('');
    done();
  });
});
