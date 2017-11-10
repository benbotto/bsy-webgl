module.exports = function(grunt) {
  'use strict';

  const clean = {
    build: 'build/',
    tmp:   '.tmp'
  };

  grunt.loadNpmTasks('grunt-contrib-clean');

  return clean;
};

