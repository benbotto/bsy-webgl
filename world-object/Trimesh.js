(function(bsy) {
  'use strict';

  /** A Trimesh implementation that can be used to create arbitrary shapes or
   * floors. */
  class Trimesh extends bsy.WorldObject {
    /**
     * Initialize the Trimesh.
     */
    constructor(width, depth, fnGetY = Math.random) {
      super();

      this.vertices      = [];
      this.vertexNormals = [];
      this.indices       = [];

      // Create a rectangle of vectors, each 1 units apart.
      const start = vec3.fromValues(-width / 2, 0, -depth / 2);

      for (let x = 0; x <= width; x += 1) {
        for (let z = 0; z <= depth; z += 1) {
          const trans = mat4.fromTranslation(mat4.create(), [x, 0, z]);
          const vert  = vec3.transformMat4(vec3.create(), start, trans);

          // Use the fnGetY function to get the Y value.
          vert[1] = fnGetY(vert[0], vert[2]);

          this.vertices.push(vert);
        }
      }

      // Flatten the vertices into one big array.
      this.vertices = bsy.VecUtils.flattenVec3Array(this.vertices);

      // Create the triangle indices.  The triangles are all clockwise so that
      // the normals can be computed correctly.
      //
      // Given width = 4 and depth = 2, the vertices are as follows:
      //
      // 0  3  6  9 12
      // 1  4  7 10 13
      // 2  5  8 11 14
      //
      // Indices are thus:
      //
      // 0,3,1
      // 3,4,1
      // 1,4,2
      // 4,5,2
      // 3,6,4
      // 6,7,4
      // 4,7,5
      // 7,8,5
      // ...
      for (let x = 0; x < width; ++x) {
        for (let z = 0; z < depth; ++z) {
          const start = x * (depth + 1) + z;

          this.indices.push(start);
          this.indices.push(start + depth + 1);
          this.indices.push(start + 1);

          this.indices.push(start + depth + 1);
          this.indices.push(start + depth + 2);
          this.indices.push(start + 1);
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

