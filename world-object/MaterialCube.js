(function(bsy) {
  'use strict';

  /** A 3D cube. */
  class MaterialCube extends bsy.Cube {
    /**
     * Initialize the cube.
     */
    constructor(material) {
      super();

      this.setMaterial(material);
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.MaterialSquare());
      this.addWorldObject('down',  new bsy.MaterialSquare());
      this.addWorldObject('right', new bsy.MaterialSquare());
      this.addWorldObject('left',  new bsy.MaterialSquare());
      this.addWorldObject('front', new bsy.MaterialSquare());
      this.addWorldObject('back',  new bsy.MaterialSquare());
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;

      this.getWorldObject('up').setMaterial(material);
      this.getWorldObject('down').setMaterial(material);
      this.getWorldObject('right').setMaterial(material);
      this.getWorldObject('left').setMaterial(material);
      this.getWorldObject('front').setMaterial(material);
      this.getWorldObject('back').setMaterial(material);
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }
  }

  bsy.MaterialCube = MaterialCube;
})(window.bsy);

