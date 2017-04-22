'use strict';

var expect = require('expect');
var mergeConfig = require('../../lib/shared/config/cli-flags');

describe('lib: config/cli-flags', function() {

  it('Should copy only config props specified to cli flags', function(done) {
    var opts = {};

    var config = {
      description: 'DESCRIPTION.',
      flags: {
        silent: true,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeConfig(opts, config);
    expect(result).toEqual({
      silent: true,
    });
    done();
  });

  it('Should override cli flags with config props', function(done) {
    var opts = {
      help: false,
      depth: 4,
      silent: true,
      tasks: false,
    };

    var config = {
      description: 'DESCRIPTION.',
      flags: {
        silent: false,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeConfig(opts, config);
    expect(result).toEqual({
      help: false,
      depth: 4,
      silent: false,
      tasks: false,
    });
    done();
  });

  it('Should not cause error if config is empty', function(done) {
    var opts = {
      help: false,
      depth: 4,
      silent: true,
      tasks: false,
    };

    var config = {};

    var result =  mergeConfig(opts, config);
    expect(result).toEqual({
      help: false,
      depth: 4,
      silent: true,
      tasks: false,
    });
    done();
  });

});

