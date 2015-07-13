/*
 * grunt-CsvToL10nJson
 * https://github.com/endorama/grunt-CsvToL10nJson
 *
 * Copyright (c) 2015 Edoardo Tenani
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
    CsvToL10nJson: {
      default_options: {
        src: 'test/fixtures/test.csv',
        dest: 'tmp/default_options'
      },
      multiple_files: {
        files: {
          'tmp/multiple_files': [ 'test/fixtures/test.csv', 'test/fixtures/test2.csv' ]
        }
      },
      use_file_expand: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures',
            src: [ '*.csv' ],
            dest: 'tmp/use_file_expand',
          }
        ],
      },
      without_prefix: {
        options: {
          usePrefix: false
        },
        src: 'test/fixtures/test.csv',
        dest: 'tmp/default_options'
      },
      with_no_files: {
        files: [{
          expand: true,
          src: 'this/file/does/not/exists.csv',
        }]
      },

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
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'CsvToL10nJson']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
