(function(bsy) {
  'use strict';

  /**
   * Renderer for world objects that use the ADS shader and have textures.  The
   * world object must implement getVertices(), getMaterial(),
   * getVertexNormals(), getTextureImage(), and getTextureCoords().
   */
  class ADSTextureWorldObjectRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, worldObj, program, textureUnit,
      buffMgr = new bsy.BufferMgr(),
      textureMgr = new bsy.TextureMgr()) {

      super(gl, worldObj, program);

      this.textureUnit    = (textureUnit === undefined) ? gl.TEXTURE0 : textureUnit;

      this.vertBuffer     = buffMgr.fillNewFloatArrayBuffer(gl, worldObj.getVertices());
      this.vertNormBuffer = buffMgr.fillNewFloatArrayBuffer(gl, worldObj.getVertexNormals());
      this.texelBuffer    = buffMgr.fillNewFloatArrayBuffer(gl, worldObj.getTextureCoords());
      this.texture        = textureMgr.loadTexture(gl, worldObj.getTextureImage());

      this.modelLoc        = gl.getUniformLocation(program, 'uModelMatrix');
      this.viewLoc         = gl.getUniformLocation(program, 'uViewMatrix');
      this.projectionLoc   = gl.getUniformLocation(program, 'uProjectionMatrix');
      this.normalTransLoc  = gl.getUniformLocation(program, 'uNormalTrans');
      this.samplerLoc      = gl.getUniformLocation(program, 'uSampler');

      this.vertexLoc       = gl.getAttribLocation(program,  'aVertexPosition');
      this.vertexNormLoc   = gl.getAttribLocation(program,  'aVertexNormal');
      this.texelLoc        = gl.getAttribLocation(program,  'aTextureCoord');

      this.matAmbientLoc   = gl.getUniformLocation(program, 'uMaterial.ambient');
      this.matDiffuseLoc   = gl.getUniformLocation(program, 'uMaterial.diffuse');
      this.matSpecularLoc  = gl.getUniformLocation(program, 'uMaterial.specular');
      this.matShininessLoc = gl.getUniformLocation(program, 'uMaterial.shininess');
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
     * Write the material.
     */
    writeMaterial() {
      const material = this.getWorldObject().getMaterial();

      this.getContext().uniform4fv(this.matAmbientLoc,  material.getAmbient());
      this.getContext().uniform4fv(this.matDiffuseLoc,  material.getDiffuse());
      this.getContext().uniform4fv(this.matSpecularLoc, material.getSpecular());
      this.getContext().uniform1f(this.matShininessLoc, material.getShininess());
    }

    /**
     * Get the normal trans location.
     */
    getNormalTransLoc() {
      return this.normalTransLoc;
    }

    /**
     * Write the normal transformation matrix, which is the transposed inverse
     * of model * view.
     */
    writeNormalTrans() {
      const normalTrans = mat4.create();

      mat4.transpose(normalTrans,
        mat4.invert(normalTrans,
          mat4.multiply(normalTrans, this.getView(), this.getModel())));

      this.getContext().uniformMatrix4fv(this.getNormalTransLoc(), false, normalTrans);
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

      // Normals.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertNormBuffer);
      gl.vertexAttribPointer(this.vertexNormLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.vertexNormLoc);

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

      // Write the material.
      this.writeMaterial();

      // Write the normal transformation, which is the transposed inverse of
      // model * view.
      this.writeNormalTrans(modelMatrix);

      // Draw the vertices.  Each vertex is a vec3, hence the divide-by-3.
      gl.drawArrays(gl.TRIANGLES, 0, this.getWorldObject().getVertices().length / 3);

      // Cleanup.
      gl.disableVertexAttribArray(this.vertexLoc);
      gl.disableVertexAttribArray(this.vertexNormLoc);
      gl.disableVertexAttribArray(this.texelLoc);
    }
  }

  bsy.ADSTextureWorldObjectRenderer = ADSTextureWorldObjectRenderer;
})(window.bsy);

