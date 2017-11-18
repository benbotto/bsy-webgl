(function(bsy) {
  'use strict';

  /** A sphere. */
  class Sphere extends bsy.WorldObject {
    /**
     * Initialize the sphere.
     */
    constructor(numTriangleStrips = 32) {
      super();

      if (numTriangleStrips % 2 !== 0)
        throw new Error('numTriangleStrips must be even.');

      this.numTriangleStrips = numTriangleStrips;
      this.vertices          = [];
      this.indices           = [];

      // Build a single quater dome and put the result in this.vertices.
      const qDome = this.buildQuarterDome(numTriangleStrips / 2);

      // Build the sphere out of 8 quarter domes.  The first 4 quarter domes are
      // rotated about the Y axis.  The second 4 are rotated about the Z axis
      // and the Y axis.
      const yAxis = vec3.fromValues(0.0, 1.0, 0.0);
      const zAxis = vec3.fromValues(0.0, 0.0, 1.0);

      for (let dome = 0; dome < 2; ++dome) {
        const rotationZ = mat4.fromRotation(mat4.create(), Math.PI * dome, zAxis);

        for (let i = 0; i < 4; ++i) {
          const rotationY = mat4.fromRotation(mat4.create(), Math.PI / 2 * i, yAxis);

          this.vertices.push(...qDome.vertices.map(v => // jshint ignore:line
            vec3.transformMat4(vec3.create(),
              vec3.transformMat4(vec3.create(), v, rotationZ), rotationY)));
        }
      }

      // Flatten the verts into one big array.
      this.vertices = bsy.VecUtils.flattenVec3Array(this.vertices);

      // Duplicate the vertex indices from the original quater dome, offsetting
      // for each part of the sphere.
      for (let i = 0; i < 8; ++i) {
        this.indices
          .push(...qDome.indices
            .map(index => index + qDome.vertices.length * i)); // jshint ignore:line
      }

      // Remove any duplicate vertices and reindex accordingly.
      this.dedupeVertices();
    }

    /**
     * Build a quarter dome.
     */
    buildQuarterDome(numTriangleStrips = 32) {
      const zAxis     = vec3.fromValues(0.0, 0.0, 1.0);
      const yAxis     = vec3.fromValues(0.0, 1.0, 0.0);
      const start     = vec3.fromValues(0.0, 1.0, 0.0);
      const halfPI    = Math.PI / 2;
      const vertices  = [];
      const indices   = [];

      /* 
       * This works by generating a large triangle composed of numTriangleStrips
       * number of triangle strips.  A "large triangle" with numTriangleStrips = 2
       * would look like this.
       *
       *          /\
       *         /__\
       *        /\  /\
       *       /__\/__\
       * 
       * The vertices are generated by starting at point 0,1,0, and rotating
       * 90 degrees around the z axis numTriangleStrips + 1 times.  For each
       * iteration, vertices are generated by rotating 90 degrees about the y
       * axis.
       */
      for (let level = 0; level < numTriangleStrips + 1; ++level) {
        const angleZ         = halfPI / numTriangleStrips * level;
        const rotationZ      = mat4.fromRotation(mat4.create(), angleZ, zAxis);
        const vertsThisLevel = level + 1;

        for (let v = 0; v < vertsThisLevel; ++v) {
          const angleY    = (vertsThisLevel === 1) ? 0 : halfPI / (vertsThisLevel - 1) * v;
          const rotationY = mat4.fromRotation(mat4.create(), angleY, yAxis);

          // "start" is rotated about Z then about Y.
          vertices.push(
            vec3.transformMat4(vec3.create(),
              vec3.transformMat4(vec3.create(), start, rotationZ), rotationY));
        }
      }

      /**
       * From the vertices generated above, create vertex indices that can be
       * used to draw the quarter dome.
       *
       *               |Level|Triangles
       *               |-----|---------
       *       0       |  0  |
       *      / \      |     |
       *     1---2     |  1  | [0,2,1 UP]
       *    / \ / \    |     |
       *   3---4---5   |  2  | [1,4,3 UP] [2,5,4 UP] [1,2,4 DOWN]
       *  / \ / \ / \  |     |
       * 6---7---8---9 |  3  | [3,7,6 UP] [4,8,7 UP] [5,9,8 UP] [3,4,7 DOWN] [4,5,8 DOWN]
       */
      for (let level = 1; level < numTriangleStrips + 1; ++level) {
        const numUp   = level;
        const numDown = level - 1;
        // The start index for the level is a sequence: n(n+1) / 2.
        // I.e. the start points are 0, 1, 3, 6, 10, 15, ...
        const lInd    = (level - 1)*level / 2;
        const nInd    = lInd + level;

        // The vertices are pushed clockwise for vertex normal computation.
        for (let u = 0; u < numUp; ++u) {
          indices.push(lInd + u);
          indices.push(nInd + u + 1);
          indices.push(nInd + u);
        }

        for (let d = 0; d < numDown; ++d) {
          indices.push(lInd + d);
          indices.push(lInd + d + 1);
          indices.push(nInd + d + 1);
        }
      }

      return {vertices, indices};
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
     * Get the normals.  Note that for a sphere the vertex normals are really
     * just the vertices.
     */
    getVertexNormals() {
      return this.getVertices();
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;
      return this;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }
  }

  bsy.Sphere = Sphere;
})(window.bsy);

