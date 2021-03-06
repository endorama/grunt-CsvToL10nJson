/*
 * grunt-CsvToL10nJson
 * https://github.com/endorama/grunt-CsvToL10nJson
 *
 * Copyright (c) 2015 Edoardo Tenani
 * Licensed under the MIT license.
 */

'use strict';

var csvToL10nJson = require('CsvToL10nJson');
var fse = require('fs-extra');
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('CsvToL10nJson', 'Grunt plugin to easily run CsvToL10nJson', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var done = this.async();

    // if no files are passed to the task exit nicely
    if (this.files.length === 0) {
      grunt.log.writeln('No files passed to the task, skipping.');
      done();
    }

    this.files.forEach(function (f) {

      // if destination path ends with .csv
      if (f.dest.indexOf('.csv') === f.dest.length-4) {
        // we calculate the correct path
        f.dest = path.dirname(f.dest);
        // if expand: false, we warn user about misconfiguration
        if (!f.orig.expand) {
          grunt.fail.warn('You destination path is invalid, should not end with .csv');
        }
      }

      fse.ensureDirSync(f.dest);

      f.src.forEach(function (src) {
        csvToL10nJson(src, f.dest, options)
        .then(function (files) {
          grunt.util._.forEach(files, function (dest) {
            grunt.log.writeln('File "' + dest + '" created.');
          });
          done();
        })
        .catch(function (reason) {
          grunt.fail.fatal(reason);
          done(reason);
        });
      });
    });

  });

};
