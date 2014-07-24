/*
 * grunt-svg2string
 * https://github.com/mistakster/grunt-svg2string
 *
 * Copyright (c) 2014 Vladimir Kuznetsov
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

function injectFilename(grunt, template, filepath) {

  var ext = path.extname(filepath);
  var filename = path.basename(filepath, ext);

  return grunt.template.process(template, {data: {
    filepath: filepath,
    filename: filename,
    capitalized: filename.toLocaleUpperCase(),
    ext: ext
  }});
}

module.exports = function (grunt) {

  grunt.registerMultiTask('svg2string', 'Transform a SVG file to a JavaScript string', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      lineLength: 100,
      splitByLines: true,
      removeSpaces: true,
      prefix: 'var SVG_<%= capitalized %> /* <%= filepath %> <%= filename %> */ = ',
      postfix: '; /* <%= capitalized %> <%= filename %> <%= filepath %> */'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {

      var src = f.src
        .filter(function (filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        })
        .map(function (filepath) {
          var content, i, l, svg = [];
          // Read file source.
          content = grunt.file.read(filepath);
          content = content.replace(/'/g, "\\'");
          if (options.removeSpaces) {
            content = content.replace(/>\s+</g, "><").trim();
          }
          if (options.splitByLines) {
            l = Math.ceil(content.length / options.lineLength);
            for (i = 0; i < l; i++) {
              svg.push("'" + content.substr(i * options.lineLength, options.lineLength) + "'");
            }
          } else {
            svg.push("'" + content + "'");
          }
          return injectFilename(grunt, options.prefix, filepath) +
            svg.join('+' + grunt.util.linefeed) +
            injectFilename(grunt, options.postfix, filepath);
        })
        .join(grunt.util.linefeed);

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
