var gulplog = require('@gulpjs/gulplog-v1');

exports.default = function(done) {
  gulplog.error('Some error here');
  done();
}
