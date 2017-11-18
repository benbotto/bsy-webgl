(function(bsy) {
  'use strict';

  /** A Trimesh with a Material. */
  class MaterialTrimesh extends bsy.Trimesh {
    /**
     * Initialize the Trimesh.
     */
    constructor(width, depth, material, fnGetY) {
      super(width, depth, fnGetY);

      this.setMaterial(material);
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

  bsy.MaterialTrimesh = MaterialTrimesh;
})(window.bsy);

