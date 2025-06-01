# Changelog

## [3.1.0](https://www.github.com/gulpjs/gulp-cli/compare/v3.0.0...v3.1.0) (2025-06-01)


### Features

* Support top-level await on Node 22.12+ ([#269](https://www.github.com/gulpjs/gulp-cli/issues/269)) ([902f5b2](https://www.github.com/gulpjs/gulp-cli/commit/902f5b28f1979b40b29e183086796387584ae1ec))

## [3.0.0](https://www.github.com/gulpjs/gulp-cli/compare/v2.3.0...v3.0.0) (2024-03-24)


### ⚠ BREAKING CHANGES

* Only allow js variants for `.gulp` config files (#261)
* Upgrade to Liftoff v5 and avoid merging flags/config/env (#259)
* Remove support for alpha versions of gulp 4 (#255)
* Remove `--verify` flag (#251)
* Replace `--require` flag with `--preload`
* Normalize repository, dropping node <10.13 support (#239)

### Features

* Add deprecated warning for gulplog v1 messages ([#266](https://www.github.com/gulpjs/gulp-cli/issues/266)) ([affeda9](https://www.github.com/gulpjs/gulp-cli/commit/affeda9e01569511cd34f1fe7f66d5ad75339624))
* Add versioned handler for gulp v5 ([#265](https://www.github.com/gulpjs/gulp-cli/issues/265)) ([f06ff30](https://www.github.com/gulpjs/gulp-cli/commit/f06ff30eb6dfa7db0a3b2935a76d79609a54016e))
* Support theming and translations via config files ([#260](https://www.github.com/gulpjs/gulp-cli/issues/260)) ([e16d675](https://www.github.com/gulpjs/gulp-cli/commit/e16d675606867a5a3a64c24e7fa48bb0a664723d))
* Upgrade to Liftoff v5 and avoid merging flags/config/env ([#259](https://www.github.com/gulpjs/gulp-cli/issues/259)) ([ed86da7](https://www.github.com/gulpjs/gulp-cli/commit/ed86da75fddfe0965d9bcc0a299e74f961f50957))


### Bug Fixes

* Ensure the logger is wired up before running liftoff ([#258](https://www.github.com/gulpjs/gulp-cli/issues/258)) ([36f05d5](https://www.github.com/gulpjs/gulp-cli/commit/36f05d5a8bb5c56437204a37f12fc4b2e31c5430))


### Miscellaneous Chores

* Normalize repository, dropping node <10.13 support ([#239](https://www.github.com/gulpjs/gulp-cli/issues/239)) ([3544dc6](https://www.github.com/gulpjs/gulp-cli/commit/3544dc65138c6409758c28e083ea1d93640246d8))
* Only allow js variants for `.gulp` config files ([#261](https://www.github.com/gulpjs/gulp-cli/issues/261)) ([e5c7983](https://www.github.com/gulpjs/gulp-cli/commit/e5c79839e87154aa5bc5d8888eeba29314b17fc6))
* Remove `--verify` flag ([#251](https://www.github.com/gulpjs/gulp-cli/issues/251)) ([7aeee5d](https://www.github.com/gulpjs/gulp-cli/commit/7aeee5d82e09099696f44fae25d315ef31c14030))
* Remove support for alpha versions of gulp 4 ([#255](https://www.github.com/gulpjs/gulp-cli/issues/255)) ([cb03b9a](https://www.github.com/gulpjs/gulp-cli/commit/cb03b9a6698ead4537d77bd0478947366b7d29a6))
* Replace `--require` flag with `--preload` ([3544dc6](https://www.github.com/gulpjs/gulp-cli/commit/3544dc65138c6409758c28e083ea1d93640246d8))
