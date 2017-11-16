(function(bsy) {
  'use strict';

  /** A Trimesh implementation that can be used to create arbitrary shapes or
   * floors. */
  class Trimesh extends bsy.WorldObject {
    /**
     * Initialize the Trimesh.
     */
    constructor(width, depth, precision = 1) {
      super();

      this.vertices      = [];
      this.vertexNormals = [];
      this.indices       = [];

      const start = vec3.fromValues(-width / 2, 0, -depth / 2);

      for (let w = 0; w <= width; w += precision) {
        for (let d = 0; d <= depth; d += precision) {
          this.vertices.push(start[0] + w, 0, start[2] + d);
        }
      }
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      return this.vertices;
    }

    /**
     * Get the vertex indices.
     */
    getVertexIndices() {
      return this.indices;
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      return this.vertexNormals;
    }
  }

  bsy.Trimesh = Trimesh;
})(window.bsy);

