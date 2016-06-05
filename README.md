<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# gulp-cli

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Command Line Utility for Gulp

## Usage

```bash
> gulp [flags] tasks
```

## Custom Metadata

When listing tasks with the `gulp -T` command, gulp-cli displays some custom metadata as defined upon task functions. Currently supported properties:

* `task.description` - String of the description to display.

```js
function clean() { ... }
clean.description = 'Cleans up generated files.';
```

* `task.flags` - Object with key/value pairs being flag/description to display.

```js
function build() { ... }
build.flags = {
  '--prod': 'Builds in production mode.'
};
```

Example Usage:

```js
function build() { ... }
build.description = 'Build entire project.';
build.flags = {
  '--prod': 'Builds in production mode (minification, etc).'
};
// gulp 3.x
gulp.task('build', build);
// gulp 4.x
gulp.task(build);
```

## Tasks

Tasks can be executed by running `gulp <task> <othertask>`. Just running `gulp` will execute the task you registered called `default`. If there is no `default` task, gulp will error.

## Compilers

You can find a list of supported languages at https://github.com/js-cli/js-interpret. If you would like to add support for a new language, send pull requests/open issues on that project.

## Environment

The CLI adds process.env.INIT_CWD which is the original cwd it was launched from.

## Flags

Gulp has very few flags to know about. All other flags are for tasks to use if needed. Simply run this command to list all available flags and commands:

```bash
gulp help
```

But beware, some flags only work with gulp 4 and will be ignored when invoked against gulp 3.

[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/gulp-cli.svg
[npm-url]: https://npmjs.org/package/gulp-cli
[npm-image]: http://img.shields.io/npm/v/gulp-cli.svg

[travis-url]: https://travis-ci.org/gulpjs/gulp-cli
[travis-image]: http://img.shields.io/travis/gulpjs/gulp-cli.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/gulp-cli
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/gulp-cli.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/gulp-cli
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/gulp-cli/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
