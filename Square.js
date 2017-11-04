(function(bsy) {
  'use strict';

  /** A simple square. */
  class Square extends bsy.WorldObject {
    /**
     * Initialize the square.
     */
    constructor(color = [1.0, 1.0, 1.0, 1.0]) {
      super();

      this.vertices = [
        -0.5,   0.5, 0,
         0.5,   0.5, 0,
         0.5,  -0.5, 0,

         0.5,  -0.5, 0,
        -0.5,  -0.5, 0,
        -0.5,   0.5, 0
      ];

      // Color is duplicated 6 times and flattened.
      this.vertexColors = Array
        .from({length: 6}, () => color)
        .reduce((prev, cur) => cur.concat(prev));

      this.location = vec3.fromValues(0, 0, 0);
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      return this.vertices;
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
    }

    /**
     * Get the square's location.
     */
    getLocation() {
      return this.location;
    }

    /**
     * Set the square's location.
     */
    setLocation(loc) {
      this.location = loc;
      return this;
    }
  }

  bsy.Square = Square;
})(window.bsy);

