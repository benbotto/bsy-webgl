module.exports = function(grunt) {
  'use strict';

  const uglify = {
    options: {
    },
    dist: {
      files: {
        'build/bsy-webgl.min.js': '.tmp/bsy-webgl.js'
      }
    }
  };

  grunt.loadNpmTasks('grunt-contrib-uglify');

  return uglify;
};

