(function(bsy) {
  'use strict';

  /** Wood material (these values are made up, and not from any
   * scientific source). */
  class Wood extends bsy.Material {
    /**
     * Init.
     */
    constructor() {
      super();

      this.ambient   = vec4.fromValues(0.09, 0.06, 0.05, 1.0);
      this.diffuse   = vec4.fromValues(0.09, 0.06, 0.05, 1.0);
      this.specular  = vec4.fromValues(0.15, 0.1,  0.05, 1.0);
      this.shininess = 0.9;
    }

    /**
     * Get the ambient.
     */
    getAmbient() {
      return this.ambient;
    }

    /**
     * Get the diffuse.
     */
    getDiffuse() {
      return this.diffuse;
    }

    /**
     * Get the specular.
     */
    getSpecular() {
      return this.specular;
    }

    /**
     * Get the shininess.
     */
    getShininess() {
      return this.shininess;
    }
  }

  bsy.Wood = Wood;
})(window.bsy);

