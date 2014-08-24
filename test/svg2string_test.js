'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var util = {};

// The line feed char for the current system.
util.linefeed = process.platform === 'win32' ? '\r\n' : '\n';

// Normalize linefeeds in a string.
util.normalizelf = function(str) {
  return str.replace(/\r\n|\n/g, util.linefeed);
};


exports.svg2string = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/default_options.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/default_options.js'));
    test.equal(actual, expected);

    test.done();
  },
  template_option: function(test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/template_option.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/template_option.js'));
    test.equal(actual, expected);

    test.done();
  },
  split_option: function(test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/split_option.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/split_option.js'));
    test.equal(actual, expected);

    test.done();
  },
  length_option: function(test) {
    var expected, actual;

    test.expect(2);

    actual = util.normalizelf(grunt.file.read('tmp/length_option.js'));
    expected = util.normalizelf(grunt.file.read('test/expected/length_option.js'));
    test.equal(actual, expected);

    actual = util.normalizelf(grunt.file.read('tmp/negative_length_option.js'));
    expected = util.normalizelf(grunt.file.read('test/expected/negative_length_option.js'));
    test.equal(actual, expected);

    test.done();
  },
  sanitize: function (test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/sanitize.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/sanitize.js'));
    test.equal(actual, expected);

    test.done();
  },
  newline: function (test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/new_line.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/new_line.js'));
    test.equal(actual, expected);

    test.done();
  },
  symbols: function (test) {
    test.expect(1);

    var actual = util.normalizelf(grunt.file.read('tmp/symbols.js'));
    var expected = util.normalizelf(grunt.file.read('test/expected/symbols_option.js'));
    test.equal(actual, expected);

    test.done();
  }
};
