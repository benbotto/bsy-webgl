(function(bsy) {
  'use strict';

  /** Base class for objects that are renderable. */
  class WorldObject {
    /**
     * Initialize the world object.
     */
    constructor() {
      this.worldObjects = new Map();
    }

    /**
     * Add a world object.
     */
    addWorldObject(name, wo) {
      if (this.worldObjects.has(name))
        throw new Error(`World object ${name} already exists.`);

      this.worldObjects.set(name, wo);
      return this;
    }

    /**
     * Get a world object by name.
     */
    getWorldObject(name) {
      return this.worldObjects.get(name);
    }

    /**
     * Iterate over the world objects.
     */
    *[Symbol.iterator]() {
      for (let [name, wo] of this.worldObjects)
        yield wo;
    }
  }

  bsy.WorldObject = WorldObject;
})(window.bsy);

