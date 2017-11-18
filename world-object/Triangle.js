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

      this.points   = [p1, p2, p3];
      this.vertices = bsy.VecUtils.flattenVec3Array(this.points);
      this.indices  = [0, 1, 2];

      // Compute the face normal.
      // 1) Create two vectors from a single point on the triangle to the other
      // two points.  It doesn't matter which point is used.
      // 2) Take the cross product of those two vectors, which yields an
      // orthagonal vector.  The order is important, so by the right-hand rule
      // the points on the triangle need to be in clockwise order or the normal
      // will point in the wrong direction.
      const v1 = vec3.sub(vec3.create(), this.points[1], this.points[0]);
      const v2 = vec3.sub(vec3.create(), this.points[1], this.points[2]);

      this.faceNormal = vec3
        .normalize(vec3.create(), vec3
          .cross(vec3.create(), v1, v2));

      // The vertex normals is just the face normal repeated once for each
      // vertex.
      this.vertexNormals = bsy.VecUtils
        .flattenVec3Array(Array
          .from({length: 3}, () => this.faceNormal));
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
     * Get the face normal for the triangle.
     */
    getFaceNormal() {
      return this.faceNormal;
    }
  }

  bsy.Triangle = Triangle;
})(window.bsy);

