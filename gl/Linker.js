(function(bsy) {
  'use strict';

  class Linker {
    /**
     * Link the shaders.
     */
    link(gl, ...shaders) {
      const program = gl.createProgram();

      shaders.forEach(shader => gl.attachShader(program, shader));
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(program)}`);

      return program;
    }
  }

  bsy.Linker = Linker;
})(window.bsy);

