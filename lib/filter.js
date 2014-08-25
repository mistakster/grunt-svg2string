var xml2js = require('xml2js');


function scan(obj, cb) {
  var out = {};
  Object.keys(obj).forEach(function (k) {
    var kv = cb(k, obj[k]);
    if (kv) {
      out[kv.key] = kv.value;
    }
  });
  return out;
}

function filter(obj) {
  var out;

  out = scan(obj, function (k, v) {
    if (k == 'svg') {
      return {
        key: 'symbol',
        value: scan(v, function (k, v) {

          if (k == '$') {

            return {
              key: k,
              value: scan(v, function (k, v) {
                if (k == 'viewBox') {
                  return {
                    key: k,
                    value: v
                  };
                } else {
                  return null;
                }
              })
            };

          } else {
            return {
              key: k,
              value: v
            };
          }

        })
      }
    } else {
      return {
        key: k,
        value: v
      };
    }
  });

  return out;
}


module.exports = function (str, cb) {
  xml2js.parseString(str, function (err, obj) {
    var builder;
    if (err) {
      cb(err);
    } else {
      obj = filter(obj);
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
