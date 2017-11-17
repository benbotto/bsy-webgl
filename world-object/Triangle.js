(function(bsy) {
  'use strict';

  /**
   * A Triangle class.  This is mainly used as a helper class for computing
   * vertex normals.
   */
  class Triangle extends bsy.WorldObject {
    /**
     * Initialize the triangle from three points.  The points should be
     * clockwise.
     */
    constructor(p1, p2, p3) {
      super();

      this.points        = [p1, p2, p3];
      this.vertices      = bsy.VecUtils.flattenVec3Array(this.points);
      this.indices       = [0, 1, 2];
      this.vertexNormals = [];

      for (let i = 0; i < this.points.length; ++i) {
        let lastI = i - 1 < 0 ? 2 : i - 1;
        let v1    = vec3.sub(vec3.create(), this.points[i], this.points[lastI]);
        let v2    = vec3.sub(vec3.create(), this.points[i], this.points[(i + 1) % 3]);

        this.vertexNormals.push(vec3.normalize(vec3.create(), vec3.cross(vec3.create(), v1, v2)));
      }

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
  }

  bsy.Triangle = Triangle;
})(window.bsy);

