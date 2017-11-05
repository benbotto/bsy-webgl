(function(bsy) {
  'use strict';

  /** Base class for objects that are renderable. */
  class WorldObject {
    /**
     * Initialize the world object.
     */
    constructor() {
      this.worldObjects = new Map();
      this.transform    = mat4.create();
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      throw new Error('getVertices() not implemented.');
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      throw new Error('getVertexColors() not implemented.');
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      throw new Error('getVertexNormals() not implemented.');
    }

    /**
     * Get the material.
     */
    getMaterial() {
      throw new Error('getMaterial() not implemented.');
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
     * Get this object's transformation matrix.
     */
    getTransform() {
      return this.transform;
    }

    /**
     * 1et this object's transformation matrix.
     */
    setTransform(transform) {
      this.transform = transform;
      return this;
    }
  }

  bsy.WorldObject = WorldObject;
})(window.bsy);

