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
    constructor() {
      super();
    }
  }

  bsy.World = World;
})(window.bsy);

