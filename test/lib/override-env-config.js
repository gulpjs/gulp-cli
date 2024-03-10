'use strict';

// var expect = require('expect');
// var copyProps = require('copy-props');
// var overrideEnvConfig = require('../../lib/shared/config/env-config');

// describe('lib: env-config', function() {

//   var originalTheme = copyProps(theme, {});
//   var originalMsgs = copyProps(msgs, {});

//   after(function() {
//     var keys = Object.keys(theme);
//     keys.forEach(function(key) {
//       delete theme[key];
//     });
//     copyProps(originalTheme, theme);

//     keys = Object.keys(msgs);
//     keys.forEach(function(key) {
//       delete msgs[key];
//     });
//     copyProps(originalMsgs, msgs);
//   });

//   it('Should copy only config props specified to env flags', function(done) {
//     var env = {};

//     var config = {
//       flags: {
//         silent: true,
//         gulpfile: '/path/to/gulpfile',
//       },
//     };

//     var result =  overrideEnvConfig(env, config, {});
//     expect(result).toEqual({
//       configPath: '/path/to/gulpfile',
//       configBase: '/path/to',
//       config: {
//         flags: {
//           silent: true,
//         },
//         log: {
//           theme: theme,
//           msgs: msgs,
//         },
//       },
//     });
//     expect(result).toBe(env);
//     done();
//   });

//   it('Should take into account forced gulpfile opts from flags', function(done) {
//     var env = {
//       cwd: '/path/to/cwd',
//       preload: 'preload',
//       configNameSearch: 'configNameSearch',
//       configPath: '/path/of/config/path',
//       configBase: '/path/of/config/base',
//       modulePath: '/path/of/module/path',
//       modulePackage: { name: 'modulePackage' },
//       configFiles: { aaa: {} },
//     };

//     var config = {
//       flags: {
//         silent: false,
//         gulpfile: '/path/to/gulpfile',
//         preload: ['a', 'b'],
//       },
//       log: {
//         theme: {
//           INFO: '{black: {1}}',
//           WARN: '{bgYellow: {1}}',
//           ERROR: '{bgRed: {1}}',
//         },
//         msgs: {
//           tasks: {
//             description: 'DESCRIPTION',
//           },
//         },
//       },
//     };

//     var resultTheme = copyProps(theme, {});
//     resultTheme.INFO = config.log.theme.INFO;
//     resultTheme.WARN = config.log.theme.WARN;
//     resultTheme.ERROR = config.log.theme.ERROR;

//     var resultMsgs = copyProps(msgs, {});
//     resultMsgs.tasks.description = config.log.msgs.tasks.description;

//     var opts = {
//       gulpfile: env.configPath,
//     };

//     var result =  overrideEnvConfig(env, config, opts);
//     expect(result).toEqual({
//       cwd: '/path/to/cwd',
//       preload: ['preload', 'a', 'b'],
//       configNameSearch: 'configNameSearch',
//       configPath: '/path/of/config/path',
//       configBase: '/path/of/config/base',
//       modulePath: '/path/of/module/path',
//       modulePackage: { name: 'modulePackage' },
//       configFiles: { aaa: {} },
//       config: {
//         flags: {
//           gulpfile: "/path/of/config/path",
//           silent: false,
//         },
//         log: {
//           theme: resultTheme,
//           msgs: resultMsgs,
//         },
//       },
//     });
//     expect(result).toBe(env);
//     done();
//   });

//   it('Should not cause error if config is empty', function(done) {
//     var env = {
//       cwd: '/path/to/cwd',
//       preload: 'preload',
//       configNameSearch: 'configNameSearch',
//       configPath: '/path/of/config/path',
//       configBase: '/path/of/config/base',
//       modulePath: '/path/of/module/path',
//       modulePackage: { name: 'modulePackage' },
//       configFiles: { aaa: {} },
//     };

//     var config = {};

//     var result =  overrideEnvConfig(env, config, {});
//     expect(result).toEqual({
//       cwd: '/path/to/cwd',
//       preload: 'preload',
//       configNameSearch: 'configNameSearch',
//       configPath: '/path/of/config/path',
//       configBase: '/path/of/config/base',
//       modulePath: '/path/of/module/path',
//       modulePackage: { name: 'modulePackage' },
//       configFiles: { aaa: {} },
//       config: {
//         flags: {},
//         log: {
//           theme: theme,
//           msgs: msgs,
//         },
//       },
//     });
//     expect(result).toBe(env);
//     done();
//   });

//   it('Should not cause error if config.flags and config.log is empty', function(done) {
//     var env = {};

//     var config = {
//       flags: {},
//       log: {},
//     };

//     var result =  overrideEnvConfig(env, config, {});
//     expect(result).toEqual({
//       config: {
//         flags: {},
//         log: {
//           theme: theme,
//           msgs: msgs,
//         },
//       },
//     });
//     expect(result).toBe(env);
//     done();
//   });
// });
