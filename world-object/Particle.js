(function(bsy) {
  'use strict';

  /** A square particle. */
  class Particle extends bsy.WorldObject {
    /**
     * Initialize the particle using a shape of some sort.
     */
    constructor(shape) {
      super();

      this.shape    = shape;
      this.location = vec3.fromValues(0, 0, 0);

      // One velocity vector per vertex.
      const velocity = Array.from({length: 3}, () => Math.random() - 0.5);

      this.velocity = bsy.VecUtils
        .flattenVec3Array(Array
          .from({length: this.getVertices().length / 3}, () => velocity));

      // One lifetime per vertex.
      const lifetime = Math.random() * 5;

      this.lifetime = Array
        .from({length: this.getVertices().length / 3}, () => lifetime);
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      return this.shape.getVertices();
    }

    /**
     * Get the vertex indices.
     */
    getVertexIndices() {
      return this.shape.getVertexIndices();
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      return this.shape.getVertexNormals();
    }

    /**
     * Set the color.
     */
    setColor(color) {
      this.shape.setColor(color);
      return this;
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.shape.getVertexColors();
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.shape.setMaterial(material);
      return this;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.shape.getMaterial();
    }

    /**
     * Set the texture image.
     */
    setTextureImage(image) {
      this.shape.setTextureImage(image);
      return this;
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      return this.shape.getTextureImage();
    }

    /**
     * Get the texture coordinates.
     */
    getTextureCoords() {
      return this.shape.getTextureCoords();
    }

    /**
     * Translate the shape.
     */
    translate(tlate) {
      vec3.add(this.location, this.location, tlate);

      // Each vertex is moved in the underlying shape rather than setting
      // a model matrix.  All the particles are drawn as one big array.
      const newVerts = bsy.VecUtils
        .flattenVec3Array(bsy.VecUtils
          .toVec3Array(this.shape.getVertices())
          .map(vec => vec3.add(vec3.create(), vec, tlate)));

      this.shape.getVertices().splice(0);
      this.shape.getVertices().push(...newVerts);

      return this;
    }

    /**
     * Set the lifetime of the particle, in seconds.
     */
    setLifetime(lifetime) {
      // One lifetime per vertex.
      this.lifetime = Array
        .from({length: this.getVertices().length / 3}, () => lifetime);

      return this;
    }

    /**
     * Get the lifetime of the particle.
     */
    getLifetime() {
      return this.lifetime;
    }

    /**
     * Set the velocity vector of the particle, as a vec3.
     */
    setVelocity(velocity) {
      // One velocity vector per vertex.
      this.velocity = bsy.VecUtils
        .flattenVec3Array(Array
          .from({length: this.getVertices().length / 3}, () => velocity));

      return this;
    }

    /**
     * Get the velocity of the particle.
     */
    getVelocity() {
      return this.velocity;
    }
  }

  bsy.Particle = Particle;
})(window.bsy);

