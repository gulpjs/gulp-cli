'use strict';

var expect = require('expect');
var formatHrtime = require('../../lib/shared/log/format-hrtime');

describe('format-hrtime', function() {
  describe('should convert hrtime to string: unit is "h"', function() {
    it('should be no decimal part if integer part greater than 10', function(done) {
      expect(formatHrtime([36000, 100])).toEqual('10 h');
      done();
    });

    it('should round first decimal place if integer part greather than 10', function(done) {
      expect(formatHrtime([36123, 100])).toEqual('10 h');
      expect(formatHrtime([37800, 0])).toEqual('11 h');
      done();
    });

    it('should print until second decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([35100, 100])).toEqual('9.75 h');
      done();
    });

    it('should round third decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([35117, 0])).toEqual('9.75 h');
      expect(formatHrtime([35119, 100])).toEqual('9.76 h');
      done();
    });

    it('should trim last "0" in decimal part', function(done) {
      expect(formatHrtime([32761, 100])).toEqual('9.1 h');
      expect(formatHrtime([32725, 100])).toEqual('9.09 h');
      expect(formatHrtime([32414, 100])).toEqual('9 h');
      done();
    });

    it('should convert minimum hrtime of unit "h" normally', function(done) {
      expect(formatHrtime([3600, 0])).toEqual('1 h');
      done();
    });

    it('should be no larger unit than `h`', function(done) {
      expect(formatHrtime([360123, 100])).toEqual('100 h');
      done();
    });
  });

  describe('should convert hrtime to string: unit is "min"', function() {
    it('should be no decimal part if integer part greater than 10', function(done) {
      expect(formatHrtime([600, 100])).toEqual('10 min');
      done();
    });

    it('should round first decimal place if integer part greather than 10', function(done) {
      expect(formatHrtime([624, 100])).toEqual('10 min');
      expect(formatHrtime([630, 0])).toEqual('11 min');
      done();
    });

    it('should print until second decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([599, 100])).toEqual('9.98 min');
      done();
    });

    it('should round third decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([585, 29e7])).toEqual('9.75 min');
      expect(formatHrtime([585, 3e8])).toEqual('9.76 min');
      done();
    });

    it('should trim last "0" in decimal part', function(done) {
      expect(formatHrtime([594, 100])).toEqual('9.9 min');
      expect(formatHrtime([540, 100])).toEqual('9 min');
      done();
    });

    it('should convert minimum hrtime of unit "min" normally', function(done) {
      expect(formatHrtime([60, 0])).toEqual('1 min');
      done();
    });

    it('should convert maximum hrtime of unit "min" normally', function(done) {
      expect(formatHrtime([3599, 999999999])).toEqual('60 min');
      done();
    });
  });

  describe('should convert hrtime to string: unit is "s"', function() {
    it('should be no decimal part if integer part greater than 10', function(done) {
      expect(formatHrtime([10, 12e7])).toEqual('10 s');
      done();
    });

    it('should round first decimal place if integer part greather than 10', function(done) {
      expect(formatHrtime([10, 4e8])).toEqual('10 s');
      expect(formatHrtime([10, 5e8])).toEqual('11 s');
      done();
    });

    it('should print until second decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([9, 12e7])).toEqual('9.12 s');
      done();
    });

    it('should round third decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([9, 124e6])).toEqual('9.12 s');
      expect(formatHrtime([9, 125e6])).toEqual('9.13 s');
      done();
    });

    it('should trim last "0" in decimal part', function(done) {
      expect(formatHrtime([9, 100e6])).toEqual('9.1 s');
      expect(formatHrtime([9, 0])).toEqual('9 s');
      done();
    });

    it('should convert minimum hrtime of unit "s" normally', function(done) {
      expect(formatHrtime([1, 0])).toEqual('1 s');
      done();
    });

    it('should convert maximum hrtime of unit "s" normally', function(done) {
      expect(formatHrtime([59, 999999999])).toEqual('60 s');
      done();
    });
  });

  describe('should convert hrtime to string: unit is "ms"', function() {
    it('should be no decimal part if integer part greater than 10', function(done) {
      expect(formatHrtime([0, 10123456])).toEqual('10 ms');
      done();
    });

    it('should round first decimal place if integer part greather than 10', function(done) {
      expect(formatHrtime([0, 10423456])).toEqual('10 ms');
      expect(formatHrtime([0, 10500000])).toEqual('11 ms');
      done();
    });

    it('should print until second decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([0, 9123456])).toEqual('9.12 ms');
      done();
    });

    it('should round third decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([0, 9124999])).toEqual('9.12 ms');
      expect(formatHrtime([0, 9125000])).toEqual('9.13 ms');
      done();
    });

    it('should trim last "0" in decimal part', function(done) {
      expect(formatHrtime([0, 9100000])).toEqual('9.1 ms');
      expect(formatHrtime([0, 9000000])).toEqual('9 ms');
      done();
    });

    it('should convert minimum hrtime of unit "ms" normally', function(done) {
      expect(formatHrtime([0, 1000000])).toEqual('1 ms');
      done();
    });

    it('should convert maximum hrtime of unit "ms" normally', function(done) {
      expect(formatHrtime([0, 999999999])).toEqual('1000 ms');
      done();
    });
  });

  describe('should convert hrtime to string: unit is "μs"', function() {
    it('should be no decimal part if integer part greater than 10', function(done) {
      expect(formatHrtime([0, 10123])).toEqual('10 μs');
      done();
    });

    it('should round first decimal place if integer part greather than 10', function(done) {
      expect(formatHrtime([0, 10423])).toEqual('10 μs');
      expect(formatHrtime([0, 10500])).toEqual('11 μs');
      done();
    });

    it('should print until second decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([0, 9123])).toEqual('9.12 μs');
      done();
    });

    it('should round third decimal place if integer part less than 10', function(done) {
      expect(formatHrtime([0, 9124])).toEqual('9.12 μs');
      expect(formatHrtime([0, 9125])).toEqual('9.13 μs');
      done();
    });

    it('should trim last "0" in decimal part', function(done) {
      expect(formatHrtime([0, 9100])).toEqual('9.1 μs');
      expect(formatHrtime([0, 9000])).toEqual('9 μs');
      done();
    });

    it('should convert minimum hrtime of unit "μs" normally', function(done) {
      expect(formatHrtime([0, 1000])).toEqual('1 μs');
      done();
    });

    it('should convert maximum hrtime of unit "μs" normally', function(done) {
      expect(formatHrtime([0, 999999])).toEqual('1000 μs');
      done();
    });
  });

  describe('should convert hrtime to string: unit is "ns"', function() {
    it('should convert minimum hrtime of unit "μs" normally', function(done) {
      expect(formatHrtime([0, 1])).toEqual('1 ns');
      done();
    });

    it('should convert maximum hrtime of unit "μs" normally', function(done) {
      expect(formatHrtime([0, 999])).toEqual('999 ns');
      done();
    });
  });

  describe('should convert irregular hrtime to an empty string', function() {
    it('should convert non hrtime to an empty string', function(done) {
      expect(formatHrtime(1234567890)).toEqual('');
      expect(formatHrtime('1234567890')).toEqual('');
      done();
    });

    it('should convert bad hrtime to an empty string', function(done) {
      expect(formatHrtime(['123', 123])).toEqual('');
      expect(formatHrtime([123, '123'])).toEqual('');
      done();
    });

    it('should covert zero hrtime to an empty string', function(done) {
      expect(formatHrtime([0, 0])).toEqual('');
      done();
    });
  });
});
