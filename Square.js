(function(bsy) {
  'use strict';

  /** A simple square. */
  class Square extends bsy.WorldObject {
    /**
     * Initialize the square.
     */
    constructor(gl, program) {
      super(gl);

      this.program  = program;
      this.vertices = [
        -0.5,   0.5, 0,
         0.5,   0.5, 0,
         0.5,  -0.5, 0,

         0.5,  -0.5, 0,
        -0.5,  -0.5, 0,
        -0.5,   0.5, 0
      ];
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      return this.vertices;
    }

    /**
     * Get the program.
     */
    getProgram() {
      return this.program;
    }

    /**
     * Draw the square.
     */
    render(gl, elapsed, mat) {
      console.log('rendering', arguments);
    }
  }

  bsy.Square = Square;
})(window.bsy);

