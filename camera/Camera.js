(function(bsy) {
  'use strict';

  /** Base class for cameras. */
  class Camera {
    /**
     * Initialize the camera.  It starts looking down the z axis at [0,0,0].
     */
    constructor() {
      this.location = vec3.fromValues(0, 0, 0);
      this.view     = mat4.lookAt(
        mat4.create(),
        this.location,
        vec3.fromValues(0, 0, -1), // Look.
        vec3.fromValues(0, 1, 0)); // Up.
    }

    /**
     * Get the view matrix.
     */
    getView() {
      return this.view;
    }

    /**
     * Set the view matrix.
     */
    setView(view) {
      this.view = view;
      return this;
    }

    /**
     * Get the location of the camera.
     */
    getLocation() {
      return this.location;
    }
  }

  bsy.Camera = Camera;
})(window.bsy);

