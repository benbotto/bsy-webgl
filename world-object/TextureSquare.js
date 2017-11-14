(function(bsy) {
  'use strict';

  /** A square with a texture. */
  class TextureSquare extends bsy.Square {
    /**
     * Initialize the square.  The image must be loaded.
     */
    constructor(image) {
      super();

      this.setTextureImage(image);

      this.textureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ];
    }

    /**
     * Set the texture image.
     */
    setTextureImage(image) {
      this.textureImage = image;
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

  bsy.TextureSquare = TextureSquare;
})(window.bsy);

