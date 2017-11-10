module.exports = function(grunt, scripts) {
  'use strict';

  const babel = {
    options: {
      presets: ['env']
    },
    dist: {
      files: {
        '.tmp/bsy-webgl.js' : '.tmp/bsy-webgl.js'
      }
    }
  };
  
  grunt.loadNpmTasks('grunt-babel');
  
  return babel;
};
