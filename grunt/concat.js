module.exports = function(grunt, scripts) {
  'use strict';

  const concat = {
    options: {
    },
    dist: {
      src : scripts,
      dest: '.tmp/bsy-webgl.js'
    }
  };
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  return concat;
};
