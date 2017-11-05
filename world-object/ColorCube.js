(function(bsy) {
  'use strict';

  /** A 3D cube. */
  class ColorCube extends bsy.Cube {
    /**
     * Initialize the cube.
     */
    constructor(colors) {
      super();

      // Defaults to all white.
      if (!colors)
        colors = Array.from({length: 6}, () => [1.0, 1.0, 1.0, 1.0]);
      else if (colors.length !== 6)
        throw new Error('6 colors are required.');

      this.getWorldObject('up').setColor(colors[0]);
      this.getWorldObject('down').setColor(colors[1]);
      this.getWorldObject('right').setColor(colors[2]);
      this.getWorldObject('left').setColor(colors[3]);
      this.getWorldObject('front').setColor(colors[4]);
      this.getWorldObject('back').setColor(colors[5]);
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.ColorSquare());
      this.addWorldObject('down',  new bsy.ColorSquare());
      this.addWorldObject('right', new bsy.ColorSquare());
      this.addWorldObject('left',  new bsy.ColorSquare());
      this.addWorldObject('front', new bsy.ColorSquare());
      this.addWorldObject('back',  new bsy.ColorSquare());
    }
  }

  bsy.ColorCube = ColorCube;
})(window.bsy);

