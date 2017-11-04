(function(global) {
  'use strict';

  class Compiler {
    /**
     * Compile the shader against the context gl.
     */
    compile(gl, source, type) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        throw new Error(`An error occurred compiling the shader: ${gl.getShaderInfoLog(shader)}`);
      }

      return shader;
    }
  }

  global.Compiler = Compiler;
})(window);

