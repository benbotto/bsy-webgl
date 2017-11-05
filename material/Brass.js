(function(bsy) {
  'use strict';

  /** Base class for Brasss. */
  class Brass extends bsy.Material {
    /**
     * Init.
     */
    constructor() {
      super();

      this.ambient   = vec4.fromValues(0.3294, 0.2235, 0.02745, 1.0);
      this.diffuse   = vec4.fromValues(0.7804, 0.5686, 0.1137,  1.0);
      this.specular  = vec4.fromValues(0.9922, 0.9412, 0.8078,  1.0);
      this.shininess = 27.9;
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

  bsy.Brass = Brass;
})(window.bsy);

