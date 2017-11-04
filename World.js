(function(global) {
  'use strict';

  /** Holds an array of WorldObjects. */
  class World {
    /**
     * Initialize the world.
     */
    constructor() {
      this.worldObjects = new Map();
      this.transform    = mat4.create();
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

    /**
     * Draw the World.
     */
    render(gl, elapsed) {
      for (let [name, wo] of this.worldObjects)
        wo.render(gl, elapsed, this.transform);
    }
  }

  global.World = World;
})(window);

