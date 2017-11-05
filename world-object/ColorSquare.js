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
      // Color is duplicated 6 times and flattened.
      this.vertexColors = Array
        .from({length: 6}, () => color)
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

