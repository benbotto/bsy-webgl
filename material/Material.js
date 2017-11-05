(function(bsy) {
  'use strict';

  /** Base class for materials. */
  class Material {
    /**
     * Init.
     */
    constructor() {
    }

    /**
     * Get the ambient.
     */
    getAmbient() {
      throw new Error('getAmbient() not implemented.');
    }

    /**
     * Get the diffuse.
     */
    getDiffuse() {
      throw new Error('getDiffuse() not implemented.');
    }

    /**
     * Get the specular.
     */
    getSpecular() {
      throw new Error('getSpecular() not implemented.');
    }

    /**
     * Get the shininess.
     */
    getShininess() {
      throw new Error('getShininess() not implemented.');
    }
  }

  bsy.Material = Material;
})(window.bsy);

