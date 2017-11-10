(function(bsy) {
  'use strict';

  /**
   * This is the root world class which is intended to hold all other
   * WorldObjects.
   */
  class World extends bsy.WorldObject {
    /**
     * Initialize the world.
     */
    constructor(camera = new bsy.Camera()) {
      super();

      this.setCamera(camera);
    }

    /**
     * Get the camera.
     */
    getCamera() {
      return this.camera;
    }

    /**
     * Set the camera.
     */
    setCamera(camera) {
      this.camera = camera;
      return this;
    }
  }

  bsy.World = World;
})(window.bsy);

