var processor = require('../lib/processor.js');
var fs = require('fs');
var util = require('util');

var str = fs.readFileSync('test/fixtures/processor/nav-up.svg', {encoding: 'utf-8'});

processor(str, function (err, xml) {
  console.log(xml);
  process.exit(0);
});
