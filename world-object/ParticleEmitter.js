(function(bsy) {
  'use strict';

  /** An object that emitts particles. */
  class ParticleEmitter extends bsy.WorldObject {
    /**
     * Create the particle emitter.  Use addWorldObject() to add particles to
     * it.
     */
    constructor() {
      super();

      this.vertices      = [];
      this.vertexNormals = [];
      this.indices       = [];
      this.textureCoords = [];
      this.vertexColors  = [];
      this.velocities    = [];
      this.lifetimes     = [];
    }

    /**
     * Add a particle.
     */
    addWorldObject(name, particle) {
      this.indices.push(...particle
        .getVertexIndices()
        .map(ind => ind + this.vertices.length / 3));

      this.vertices.push(...particle.getVertices());
      this.vertexNormals.push(...particle.getVertexNormals());
      this.velocities.push(...particle.getVelocity());
      this.lifetimes.push(...particle.getLifetime());

      // Colors are optional
      const colors = particle.getVertexColors();

      if (colors)
        this.vertexColors.push(...colors);

      // Texels are optional.
      const texels = particle.getTextureCoords();

      if (texels)
        this.textureCoords.push(...texels);

      return super.addWorldObject(name, particle);
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      return this.vertices;
    }

    /**
     * Get the vertex indices.
     */
    getVertexIndices() {
      return this.indices;
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      return this.vertexNormals;
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
    }

    /**
     * Get the velocities.
     */
    getVelocities() {
      return this.velocities;
    }

    /**
     * Get the lifetimes.
     */
    getLifetimes() {
      return this.lifetimes;
    }

    /**
     * Get the material.
     */
    //getMaterial() {
    //}

    /**
     * Get the texture coordinates.
     */
    getTextureCoords() {
      return this.textureCoords;
    }
  }

  bsy.ParticleEmitter = ParticleEmitter;
})(window.bsy);

