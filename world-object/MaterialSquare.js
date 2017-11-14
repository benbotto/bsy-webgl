(function(bsy) {
  'use strict';

  /** A materialed square. */
  class MaterialSquare extends bsy.Square {
    /**
     * Initialize the square.
     */
    constructor(material) {
      super();

      this.material = material;
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }
  }

  bsy.MaterialSquare = MaterialSquare;
})(window.bsy);

