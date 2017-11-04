(function(global) {
  'use strict';

  /** A simple triangle. */
  class Triangle {
    /**
     * Initialize the triangle from three points.  The points should be clockwise
     */
    constructor(v1, v2, v3) {
      this.vertices = [v1, v2, v3];
    }

    /**
     * Draw the triangle.
     */
    render(gl, mat) {
    }
  }

  global.Triangle = Triangle;
})(window);

