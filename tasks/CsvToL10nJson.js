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
    var options = this.options({
      src: '.',
      dest: ', '
    });

    var done = this.async();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      console.log(f.src)
      console.log(f.dest)
      // grunt.log.writeln(f)
      // 
      fse.ensureDirSync(f.dest);

      csvToL10nJson(f.src[0], f.dest)
        .then(function (files) {
          console.log(files)
          grunt.log.writeln('File "' + f.dest + '" created.');
          done();
        })
        .catch(function (reason) {
          grunt.fail.fatal(reason);
          done(reason);
        });

      // // Concat specified files.
      // var src = f.src.filter(function(filepath) {
      //   // Warn on and remove invalid source files (if nonull was set).
      //   if (!grunt.file.exists(filepath)) {
      //     grunt.log.warn('Source file "' + filepath + '" not found.');
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }).map(function(filepath) {
      //   // Read file source.
      //   return grunt.file.read(filepath);
      // }).join(grunt.util.normalizelf(options.separator));

      // // Handle options.
      // src += options.punctuation;

      // // Write the destination file.
      // grunt.file.write(f.dest, src);

      // // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
