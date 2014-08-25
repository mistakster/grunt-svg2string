var filter = require('../lib/filter.js');
var fs = require('fs');
var util = require('util');

exports.svgfilter = {

  a: function (test) {

    var str = fs.readFileSync('test/fixtures/icons/nav-up.svg');
    filter(str, function (err, obj, xml) {

      console.log('');
      console.log(util.inspect(obj, {depth: null}));
      console.log(xml);

      test.done();

    });

  },

  b: function (test) {

    test.done();

  }

};