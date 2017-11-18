(function(bsy) {
  'use strict';

  /** A simple square. */
  class Square extends bsy.WorldObject {
    /**
     * Initialize the square.
     */
    constructor() {
      super();

      this.vertices = [
        -0.5,   0.5, 0,
         0.5,   0.5, 0,
         0.5,  -0.5, 0,
        -0.5,  -0.5, 0
      ];

      this.vertexNormals = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
      ];

      this.indices = [
        0, 1, 2,
        2, 3, 0
      ];

      this.textureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ];
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
     * Set the color.
     */
    setColor(color = [1.0, 1.0, 1.0, 1.0]) {
      // There needs to be one color per vertex.  (Note that each vertex
      // is made up of 3 elements.)
      this.vertexColors = Array
        .from({length: this.getVertices().length / 3}, () => color)
        .reduce((prev, cur) => cur.concat(prev));

      return this;
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return this.vertexColors;
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;
      return this;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }

    /**
     * Set the texture image.
     */
    setTextureImage(image) {
      this.textureImage = image;
      return this;
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      return this.textureImage;
    }

    /**
     * Get the texture coordinates.
     */
    getTextureCoords() {
      return this.textureCoords;
    }
  }

  bsy.Square = Square;
})(window.bsy);

