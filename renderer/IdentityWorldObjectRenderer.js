(function(bsy) {
  'use strict';

  /**
   * Renderer for world objects that use the identity shader.  The must
   * implement getVertices() and getVertexColors().
   */
  class IdentityWorldObjectRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, worldObj, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, worldObj, program);

      this.vertBuffer    = buffMgr.fillNewBuffer(gl, worldObj.getVertices());
      this.colorBuffer   = buffMgr.fillNewBuffer(gl, worldObj.getVertexColors());

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
     * Render the worldObj.
     */
    render(gl, timeDeltaMS, trans) {
      this.useProgram();

      // Locations.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
      gl.vertexAttribPointer(this.vertexLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.vertexLoc);

      // Colors.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.vertexAttribPointer(this.colorLoc, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.colorLoc);

      // The model matrix is this object's transform and the parent's.
      const modelMatrix = mat4.create();
      mat4.multiply(modelMatrix, trans, this.getWorldObject().getTransform());
      this.setModel(modelMatrix);

      // Set the MVP in the shader.
      this.writeProjection();
      this.writeView();
      this.writeModel();

      // Draw the vertices.  Each vertex is a vec3, hence the divide-by-3.
      gl.drawArrays(gl.TRIANGLES, 0, this.getWorldObject().getVertices().length / 3);

      // Cleanup.
      gl.disableVertexAttribArray(this.vertexLoc);
      gl.disableVertexAttribArray(this.colorLoc);
    }
  }

  bsy.IdentityWorldObjectRenderer = IdentityWorldObjectRenderer;
})(window.bsy)

