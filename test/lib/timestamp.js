'use strict';

var expect = require('expect');
var timestamp = require('../../lib/shared/log/timestamp');

describe('lib: timestamp', function() {

  it('should output each element', function(done) {
    var before = new Date();

    var year = timestamp('YYYY');
    var month = timestamp('MM');
    var date = timestamp('DD');
    var hours = timestamp('HH');
    var minutes = timestamp('mm');
    var seconds = timestamp('ss');
    var millis = timestamp('SSS');

    var after = new Date();

    expect(year).toHaveLength(4);
    expect(Number(year)).toBeGreaterThanOrEqual(before.getFullYear());
    expect(Number(year)).toBeLessThanOrEqual(after.getFullYear());

    expect(month).toHaveLength(2);
    expect(Number(month)).toBeGreaterThanOrEqual(before.getMonth() + 1);
    expect(Number(month)).toBeLessThanOrEqual(after.getMonth() + 1);

    expect(date).toHaveLength(2);
    expect(Number(date)).toBeGreaterThanOrEqual(before.getDate());
    expect(Number(date)).toBeLessThanOrEqual(after.getDate());

    expect(hours).toHaveLength(2);
    expect(Number(hours)).toBeGreaterThanOrEqual(before.getHours());
    expect(Number(hours)).toBeLessThanOrEqual(after.getHours());

    expect(minutes).toHaveLength(2);
    expect(Number(minutes)).toBeGreaterThanOrEqual(before.getMinutes());
    expect(Number(minutes)).toBeLessThanOrEqual(after.getMinutes());

    expect(seconds).toHaveLength(2);
    expect(Number(seconds)).toBeGreaterThanOrEqual(before.getSeconds());
    expect(Number(seconds)).toBeLessThanOrEqual(after.getSeconds());

    expect(millis).toHaveLength(3);
    expect(Number(millis)).toBeGreaterThanOrEqual(before.getMilliseconds());
    expect(Number(millis)).toBeLessThanOrEqual(after.getMilliseconds());

    done();
  });

  it('should output in specified format', function(done) {
    expect(timestamp('YYYY/MM/DD HH:mm:ss')).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/);
    expect(timestamp('YYYY-MM-DDTHH:mm:ss.SSSZ')).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    done();
  });
});
