(function(bsy) {
  'use strict';

  /** BluePlastic material (made up values). */
  class BluePlastic extends bsy.Material {
    /**
     * Init.
     */
    constructor() {
      super();

      this.ambient  = vec4.fromValues(0.1,  0.2,  0.4,  1.0);
      this.diffuse  = vec4.fromValues(0.08, 0.15, 0.9,  1.0);
      this.specular = vec4.fromValues(0.15, 0.3,  0.97, 1.0);
      this.shininess = 97.9;
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

  bsy.BluePlastic = BluePlastic;
})(window.bsy);

