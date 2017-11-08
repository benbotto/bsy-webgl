(function(bsy) {
  'use strict';

  /**
   * Renderer for world objects that use the identity texture shader.  The
   * world object must implement getVertices(), getTextureImage() and
   * getTextureCoords().
   */
  class IdentityTextureWorldObjectRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, worldObj, program,
      textureUnit,
      buffMgr = new bsy.BufferMgr(),
      textureMgr = new bsy.TextureMgr()) {

      super(gl, worldObj, program);

      this.textureUnit   = (textureUnit === undefined) ? gl.TEXTURE0 : textureUnit;

      this.vertBuffer    = buffMgr.fillNewBuffer(gl, worldObj.getVertices());
      this.texelBuffer   = buffMgr.fillNewBuffer(gl, worldObj.getTextureCoords());
      this.texture       = textureMgr.loadTexture(gl, worldObj.getTextureImage());

      this.modelLoc      = gl.getUniformLocation(program, 'uModelMatrix');
      this.viewLoc       = gl.getUniformLocation(program, 'uViewMatrix');
      this.projectionLoc = gl.getUniformLocation(program, 'uProjectionMatrix');
      this.samplerLoc    = gl.getUniformLocation(program, 'uSampler');
      this.vertexLoc     = gl.getAttribLocation(program,  'aVertexPosition');
      this.texelLoc      = gl.getAttribLocation(program,  'aTextureCoord');
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

      // Texels.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texelBuffer);
      gl.vertexAttribPointer(this.texelLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.texelLoc);

      // Active the texture.
      gl.activeTexture(this.textureUnit);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.uniform1i(this.samplerLoc, 0);

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
      gl.disableVertexAttribArray(this.texelLoc);
    }
  }

  bsy.IdentityTextureWorldObjectRenderer = IdentityTextureWorldObjectRenderer;
})(window.bsy)

