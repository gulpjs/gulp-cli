'use strict';

var expect = require('expect');
var mergeCliOpts = require('../../lib/shared/config/cli-flags');

describe('lib: cli-flags', function() {

  it('Should copy only config props specified to cli flags', function(done) {
    var opts = {};

    var config = {
      description: 'DESCRIPTION.',
      flags: {
        silent: true,
        continue: true,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeCliOpts(opts, config);
    expect(result).toEqual({
      silent: true,
      continue: true,
    });
    expect(result).not.toBe(opts);
    done();
  });

  it('Should not override cli flags with config props', function(done) {
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
        depth: 3,
        gulpfile: '/path/to/gulpfile',
      },
    };

    var result =  mergeCliOpts(opts, config);
    expect(result).toEqual({
      help: false,
      depth: 4,
      silent: true,
      tasks: false,
    });
    expect(result).not.toBe(opts);
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

    var result =  mergeCliOpts(opts, config);
    expect(result).toEqual({
      help: false,
      depth: 4,
      silent: true,
      tasks: false,
    });
    expect(result).not.toBe(opts);
    done();
  });

});

