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
      return this.shape.setColor(color);
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
      return this.shape.setMaterial(material);
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
      return this.shape.setTextureImage(image);
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
  }

  bsy.Particle = Particle;
})(window.bsy);

