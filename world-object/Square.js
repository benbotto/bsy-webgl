(function(bsy) {
  'use strict';

  /** A simple square. */
  class Square extends bsy.WorldObject {
    /**
     * Initialize the square.
     */
    constructor() {
      super();

      this.vertices = [
        -0.5,   0.5, 0,
         0.5,   0.5, 0,
         0.5,  -0.5, 0,
        -0.5,  -0.5, 0
      ];

      this.indices = [
        0, 1, 2,
        2, 3, 0
      ];
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
  }

  bsy.Square = Square;
})(window.bsy);

