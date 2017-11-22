(function(bsy) {
  'use strict';

  /** A simple circle. */
  class Circle extends bsy.WorldObject {
    /**
     * Initialize the circle.
     */
    constructor(numRingPoints = 32) {
      super();

      this.vertices = [];

      // Make points around a ring.
      const rot   = quat.setAxisAngle(quat.create(), [0, 0, 1], 2 * Math.PI / numRingPoints);
      let   point = [0, 1, 0];

      for (let i = 0; i < numRingPoints; ++i) {
        point = vec3.clone(point);
        this.vertices.push(vec3.transformQuat(point, point, rot));
      }

      // Each set of two points will connect to the center of the circle, which
      // is the last point.
      this.vertices.push([0, 0, 0]);

      // Create the indices in a clockwise fashion.
      this.indices = [];

      for (let i = 1; i < numRingPoints; ++i)
        this.indices.push(i, i - 1, numRingPoints);
      this.indices.push(0, numRingPoints - 1, numRingPoints);

      // The vertex normals all point in the positive z direction.
      this.vertexNormals = this.vertices.map(() => [0, 0, 1]);

      // Flatten the arrays.
      this.vertices      = bsy.VecUtils.flattenVec3Array(this.vertices);
      this.vertexNormals = bsy.VecUtils.flattenVec3Array(this.vertexNormals);
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

    /**
     * Set the color.
     */
    setColor(color = [1.0, 1.0, 1.0, 1.0]) {
      // There needs to be one color per vertex.  (Note that each vertex
      // is made up of 3 elements.)
      this.vertexColors = Array
        .from({length: this.getVertices().length / 3}, () => color)
        .reduce((prev, cur) => cur.concat(prev));

      return this;
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
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

  bsy.Circle = Circle;
})(window.bsy);

