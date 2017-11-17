(function(bsy) {
  'use strict';

  /**
   * A Triangle with a color.
   */
  class ColorTriangle extends bsy.Triangle {
    /**
     * Initialize the triangle from three points and a color.  The points
     * should be clockwise.
     */
    constructor(v1, v2, v3, color) {
      super(v1, v2, v3);

      this.setColor(color);
    }

    /**
     * Set the color.
     */
    setColor(color = [1.0, 1.0, 1.0, 1.0]) {
      this.vertexColors = bsy.VecUtils.flattenVec4Array([color, color, color]);
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
    }
  }

  bsy.ColorTriangle = ColorTriangle;
})(window.bsy);

