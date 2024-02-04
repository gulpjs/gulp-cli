'use strict';

function timestamp(format) {
  if (typeof format !== 'string') {
    return noop;
  }

  var date = new Date();

  var result = '';
  var arr = format.split(/(YYYY|MM|DD|HH|mm|ss|SSS)/);
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    switch (el) {
    case 'YYYY':
      result += align(date.getFullYear(), 4);
      break;
    case 'MM':
      result += align(date.getMonth() + 1, 2);
      break;
    case 'DD':
      result += align(date.getDate(), 2);
      break;
    case 'HH':
      result += align(date.getHours(), 2);
      break;
    case 'mm':
      result += align(date.getMinutes(), 2);
      break;
    case 'ss':
      result += align(date.getSeconds(), 2);
      break;
    case 'SSS':
      result += align(date.getMilliseconds(), 3);
      break;
    default:
      result += el;
      break;
    }
  }

  return result;
}

function noop() {
  return "";
}

function align(v, n) {
  return String(v).padStart(n, '0').slice(-n);
}

module.exports = timestamp;
