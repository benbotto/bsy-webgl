(function(bsy) {
  'use strict';

  /** Renders a Square */
  class SquareRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, square, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, square, program);

      this.vertBuffer    = buffMgr.fillNewBuffer(gl, square.getVertices());
      this.colorBuffer   = buffMgr.fillNewBuffer(gl, square.getVertexColors());

      this.modelLoc      = gl.getUniformLocation(program, 'uModelMatrix');
      this.viewLoc       = gl.getUniformLocation(program, 'uViewMatrix');
      this.projectionLoc = gl.getUniformLocation(program, 'uProjectionMatrix');
      this.vertexLoc     = gl.getAttribLocation(program,  'aVertexPosition');
      this.colorLoc      = gl.getAttribLocation(program,  'aVertexColor');
    }

    /**
     * Get the projection location attribute.
     */
    getProjectionLoc() {
      return this.projectionLoc;
    }

    /**
     * Get the view location attribute.
     */
    getViewLoc() {
      return this.viewLoc;
    }

    /**
     * Get the model location attribute.
     */
    getModelLoc() {
      return this.modelLoc;
    }

    /**
     * Render the square.
     */
    render(gl, timeDeltaMS, trans) {
      this.useProgram();

      {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        gl.vertexAttribPointer(
          this.vertexLoc,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        gl.enableVertexAttribArray(this.vertexLoc);
      }

      {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(
          this.colorLoc,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        gl.enableVertexAttribArray(this.colorLoc);
      }

      // The model matrix is this object's transform and the parent's.
      const modelMatrix = mat4.create();
      mat4.multiply(modelMatrix, trans, this.getWorldObject().getTransform());
      this.setModel(modelMatrix);

      // Set the MVP in the shader.
      this.writeProjection();
      this.writeView();
      this.writeModel();

      {
        const offset = 0;
        const vertexCount = 6;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
      }
    }
  }

  bsy.SquareRenderer = SquareRenderer;
})(window.bsy)

