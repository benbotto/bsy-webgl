(function(bsy) {
  'use strict';

  /** A 3D cube. */
  class MaterialCube extends bsy.Cube {
    /**
     * Initialize the cube.
     */
    constructor(material) {
      super();

      this.material = material;
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.MaterialSquare(this.material));
      this.addWorldObject('down',  new bsy.MaterialSquare(this.material));
      this.addWorldObject('right', new bsy.MaterialSquare(this.material));
      this.addWorldObject('left',  new bsy.MaterialSquare(this.material));
      this.addWorldObject('front', new bsy.MaterialSquare(this.material));
      this.addWorldObject('back',  new bsy.MaterialSquare(this.material));
    }
  }

  bsy.MaterialCube = MaterialCube;
})(window.bsy);

