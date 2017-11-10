module.exports = function(grunt, scripts) {
  'use strict';

  const jshint = {
    /* Global options. */
    options: {
      strict:    true,
      eqeqeq:    true,
      indent:    2,
      quotmark:  'single',
      undef:     true,
      unused:    true,
      esversion: 6,
      reporter:  require('jshint-stylish')
    },

    /* Get the lint out of all app files. */
    app: {
      options: {
        globals: {
          window: true,
          mat4  : true,
          vec2  : true,
          vec3  : true,
          vec4  : true,
          quat  : true,
          Image : true,
        }
      },
      files: {
        src: scripts
      }
    }
  };

  grunt.loadNpmTasks('grunt-contrib-jshint');

  return jshint;
};

