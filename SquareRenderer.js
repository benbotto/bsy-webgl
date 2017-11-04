(function(bsy) {
  'use strict';

  /** Renders a Square */
  class SquareRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(ctx, square, program, buffMgr = new bsy.BufferMgr()) {
      super(ctx, square, program);

      this.vertBuffer = buffMgr.fillNewBuffer(ctx, square.getVertices());
    }

    /**
     * Render the square.
     */
    render(gl, timeDeltaMS, trans) {
      const program = this.getProgram();

      this.useProgram();

      const programInfo = {
        attribLocations: {
          vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
        },
      };

      const modelViewMatrix = mat4.create();

      // Now move the drawing position a bit to where we want to
      // start drawing the square.

      mat4.translate(modelViewMatrix,     // destination matrix
                     modelViewMatrix,     // matrix to translate
                     [-0.0, 0.0, -6.0]);  // amount to translate

      {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
      }

      // Set the shader uniforms

      gl.uniformMatrix4fv(
          programInfo.uniformLocations.projectionMatrix,
          false,
          this.getProjection());
      gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix);

      {
        const offset = 0;
        const vertexCount = 6;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
      }
    }
  }

  bsy.SquareRenderer = SquareRenderer;
})(window.bsy)

