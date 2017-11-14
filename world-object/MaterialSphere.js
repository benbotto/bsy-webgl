(function(bsy) {
  'use strict';

  /** A materialed sphere. */
  class MaterialSphere extends bsy.Sphere {
    /**
     * Initialize the sphere.
     */
    constructor(material, numTriangleStrips = 32) {
      super(numTriangleStrips);

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

  bsy.MaterialSphere = MaterialSphere;
})(window.bsy);

