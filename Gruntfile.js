/*
 * grunt-svg2string
 * https://github.com/mistakster/grunt-svg2string
 *
 * Copyright (c) 2014 Vladimir Kuznetsov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    svg2string: {
      default_options: {
        options: {},
        files: {
          'tmp/default_options.js': ['test/fixtures/short.svg', 'test/fixtures/elements.svg']
        }
      },
      template_option: {
        options: {
          template: 'App.defaults("App.SVG", {[%= filename %]: [%= content %]});'
        },
        files: {
          'tmp/template_option.js': ['test/fixtures/short.svg']
        }
      },
      split_option: {
        options: {
          wrapLines: false
        },
        files: {
          'tmp/split_option.js': ['test/fixtures/elements.svg']
        }
      },
      length_option: {
        options: {
          lineLength: 62
        },
        files: {
          'tmp/length_option.js': ['test/fixtures/elements.svg']
        }
      },
      negative_length_option: {
        options: {
          lineLength: -10
        },
        files: {
          'tmp/negative_length_option.js': ['test/fixtures/elements.svg']
        }
      },
      sanitize: {
        options: {
          template: '/* [%= filename %] // [%= sanitized %] // [%= capitalized %] */'
        },
        files: {
          'tmp/sanitize.js': 'test/fixtures/very!Strange()file_name---.svg'
        }
      },
      new_line: {
        options: {},
        files: {
          'tmp/new_line.js': 'test/fixtures/new_line.svg'
        }
      },
      symbols: {
        options: {
          symbols: 'symbols'
        },
        files: {
          'tmp/symbols.js': 'test/fixtures/icons/*.svg'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'svg2string', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
