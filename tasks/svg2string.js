/*
 * grunt-svg2string - Transforms a SVG file into a JavaScript string
 * https://github.com/mistakster/grunt-svg2string
 *
 * Copyright (c) 2014 Vladimir Kuznetsov
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');


function sanitizeString(str) {
  return str.replace(/[^0-9a-z]+/gi, ' ')
    .trim()
    .replace(/\s+/g, '_');
}



function processOutput(grunt, template, fileObject, content) {

  return grunt.template.process(template, {
    data: {
      content: content,
      filepath: fileObject.filepath,
      filename: fileObject.filename,
      sanitized: fileObject.sanitized,
      capitalized: fileObject.capitalized,
      ext: fileObject.ext
    },
    delimiters: 'svg2StringDelimiters'
  });
}

module.exports = function (grunt) {

  grunt.template.addDelimiters('svg2StringDelimiters', '[%', '%]');

  grunt.registerMultiTask('svg2string', 'Transforms a SVG file into a JavaScript string', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var DEFAULT_LENGTH = 120;

    var options = this.options({
      lineLength: DEFAULT_LENGTH,
      wrapLines: true,
      template: 'var SVG_[%= capitalized %] =\n[%= content %];'
    });

    if (options.lineLength <= 3) {
      options.lineLength = DEFAULT_LENGTH;
    }

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
          var ext = path.extname(filepath);
          var filename = path.basename(filepath, ext);
          var sanitized = sanitizeString(filename);

          return {
            content: grunt.file.read(filepath),
            filepath: filepath,
            filename: filename,
            sanitized: sanitized,
            capitalized: sanitized.toLocaleUpperCase(),
            ext: ext
          };
        })
        .map(function (fileObject) {
          var content;
          if (options.symbols) {
            content = fileObject.content;

            var symbolId = sanitizeString(options.symbols + '_' + fileObject.sanitized);
            content = content.replace(/^[\s\S]*<svg[^>]*(viewBox="[^"]*")[^>]*>/i, '<symbol id="' + symbolId + '" $1>');
            content = content.replace(/<\/svg>/i, '</symbol>');

            fileObject.content = content;
          }
          return fileObject;
        })
        .map(function (fileObject) {
          var content, i, l, svg, lineLength;

          svg = [];
          lineLength = options.lineLength - 3;

          // Escape content
          content = fileObject.content.replace(/'/g, "\\'");
          // Remove all unimportant space characters
          content = content
            .replace(/\s+/g, " ")
            .replace(/>\s+</g, "><")
            .trim();
          if (options.wrapLines) {
            l = Math.ceil(content.length / lineLength);
            for (i = 0; i < l; i++) {
              svg.push("'" + content.substr(i * lineLength, lineLength) + "'");
            }
          } else {
            svg.push("'" + content + "'");
          }

          svg = svg.join('+\n');

          return options.symbols ? svg :
            processOutput(grunt, options.template, fileObject, svg);
        });

      if (options.symbols) {
        src = (function (lines) {
          var s = sanitizeString(options.symbols);

          lines.unshift('\'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="display:none">\'');
          lines.push('\'</svg>\'');

          return processOutput(
            grunt,
            options.template,
            {
              sanitized: s,
              capitalized: s.toLocaleUpperCase()
            },

            src.join('+' + grunt.util.linefeed));

        }(src));
      } else {
        src = src.join(grunt.util.linefeed);
      }

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
