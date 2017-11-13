(function(bsy) {
  'use strict';

  /** A colored square. */
  class ColorSquare extends bsy.Square {
    /**
     * Initialize the square.
     */
    constructor(color) {
      super();

      this.setColor(color);
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
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
    }
  }

  bsy.ColorSquare = ColorSquare;
})(window.bsy);

