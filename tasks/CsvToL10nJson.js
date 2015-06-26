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

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('CsvToL10nJson', 'Grunt plugin to easily run CsvToL10nJson', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    // });

    var done = this.async();

    this.files.forEach(function (f) {

      fse.ensureDirSync(f.dest);

      f.src.forEach(function (src) {
        csvToL10nJson(src, f.dest)
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
