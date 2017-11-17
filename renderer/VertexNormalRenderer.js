(function(bsy) {
  'use strict';

  /**
   * Renders vertex normals.  The WorldObject must implement getVertices(),
   * and getVertexNormals().
   */
  class VertexNormalRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, worldObj, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, worldObj, program);

      this.vertices      = this.createVertexNormalLines(worldObj);
      this.vertBuffer    = buffMgr.fillNewFloatArrayBuffer(gl, this.vertices);
      this.modelLoc      = gl.getUniformLocation(program, 'uModelMatrix');
      this.viewLoc       = gl.getUniformLocation(program, 'uViewMatrix');
      this.projectionLoc = gl.getUniformLocation(program, 'uProjectionMatrix');
      this.vertexLoc     = gl.getAttribLocation(program,  'aVertexPosition');
    }

    /**
     * Create vertex normal line data.  These are the vertices that will be
     * rendered.
     */
    createVertexNormalLines(worldObj) {
      const verts   = bsy.VecUtils.toVec3Array(worldObj.getVertices());
      const normals = bsy.VecUtils.toVec3Array(worldObj.getVertexNormals());

      return verts
        // Create a unit-length line from each vertex in the direction of the
        // normal.  Returns two points.
        .map((vert, i) => [vert, vec3.add(vec3.create(), vert, normals[i])])
        // Flatten each set of vertices into one array.
        .reduce((prev, cur) => prev.concat(cur), [])
        // Flatten the vertices into one big array.
        .reduce((prev, cur) => prev.concat(cur[0], cur[1], cur[2]), []);
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

      // The model matrix is this object's transform and the parent's.
      const modelMatrix = mat4.create();
      mat4.multiply(modelMatrix, trans, this.getWorldObject().getTransform());
      this.setModel(modelMatrix);

      // Set the MVP in the shader.
      this.writeProjection();
      this.writeView();
      this.writeModel();

      // Draw the normal lines.
      gl.drawArrays(gl.LINES, 0, this.vertices.length / 3);

      // Cleanup.
      gl.disableVertexAttribArray(this.vertexLoc);
    }
  }

  bsy.VertexNormalRenderer = VertexNormalRenderer;
})(window.bsy);

