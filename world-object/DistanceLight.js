(function(bsy) {
  'use strict';

  /** A DistanceLight. */
  class DistanceLight {
    /**
     * Initialize the light.
     */
    constructor(ambient, diffuse, specular, direction) {
      this
        .setAmbient(ambient)
        .setDiffuse(diffuse)
        .setSpecular(specular)
        .setDirection(direction);
    }

    /**
     * Get the ambient.
     */
    getAmbient() {
      return this.ambient;
    }

    /**
     * Set the ambient.
     */
    setAmbient(ambient = vec4.fromValues(1.0, 1.0, 1.0, 1.0)) {
      this.ambient = ambient;
      return this;
    }

    /**
     * Get the diffuse.
     */
    getDiffuse() {
      return this.diffuse;
    }

    /**
     * Set the diffuse.
     */
    setDiffuse(diffuse = vec4.fromValues(1.0, 1.0, 1.0, 1.0)) {
      this.diffuse = diffuse;
      return this;
    }

    /**
     * Get the specular.
     */
    getSpecular() {
      return this.specular;
    }

    /**
     * Set the specular.
     */
    setSpecular(specular = vec4.fromValues(1.0, 1.0, 1.0, 1.0)) {
      this.specular = specular;
      return this;
    }

    /**
     * Get the direction.
     */
    getDirection() {
      return this.direction;
    }

    /**
     * Set the direction.
     */
    setDirection(direction = vec3.fromValues(0.0, 0.0, -1.0)) {
      this.direction = direction;
      return this;
    }
  }

  bsy.DistanceLight = DistanceLight;
})(window.bsy);

