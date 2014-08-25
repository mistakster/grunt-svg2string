var xml2js = require('xml2js');


function scan(obj, cb) {
  var out = {};
  Object.keys(obj).forEach(function (k) {
    cb(function (_key, _value) { out[_key] = _value; }, k, obj[k]);
  });
  return out;
}


function filter(obj, id) {
  return scan(obj, function (emit, k, v) {
    if (k == 'svg') {
      emit('symbol', scan(v, function (emit, k, v) {
        if (k == '$') {
          v.id = id;
          emit(k, scan(v, function (emit, k, v) {
            if (k == 'viewBox' || (k == 'id' && v)) {
              emit(k, v);
            }
          }));
        } else {
          emit(k, v);
        }
      }));
    } else {
      emit(k, v);
    }
  });
}


function text(obj) {
  var keys = Object.keys(obj);
  if (keys.length <= 1 && typeof obj['_'] == 'undefined') {
    obj['_'] = '';
  }
  keys.forEach(function (k) {
    var v = obj[k];
    if (k == '_' && typeof v == 'string') {
      obj[k] = v.replace(/\s+/g, ' ');
    }
    if (k != '$' && typeof v == 'object' && typeof v.length == 'undefined') {
      obj[k] = text(v);
    }
  });
  return obj;
}


module.exports = function (str, cb) {
  var parser = new xml2js.Parser();
  parser.parseString(str, function (err, obj) {
    var builder;
    if (err) {
      cb(err);
    } else {
      obj = filter(obj, 'blah-blah');
      obj.symbol = text(obj.symbol);
      builder = new xml2js.Builder({
        headless: true,
        renderOpts: {
          pretty: false
        }
      });
      cb(null, obj, builder.buildObject(obj));
    }
  });
};
