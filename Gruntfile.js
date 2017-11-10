module.exports = function(grunt) {
  'use strict';

  const scripts = require('./grunt/scriptGarner')();

  console.log(scripts);

  grunt.initConfig({
    jshint: require('./grunt/jshint')(grunt, scripts),
    concat: require('./grunt/concat')(grunt, scripts),
    babel:  require('./grunt/babel')(grunt, scripts),
    uglify: require('./grunt/uglify')(grunt),
    clean:  require('./grunt/clean')(grunt),
  });

  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'babel', 'uglify', 'clean:tmp']);
};

