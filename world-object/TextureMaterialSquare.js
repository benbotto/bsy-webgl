(function(bsy) {
  'use strict';

  /** A square with a material and texture. */
  class TextureMaterialSquare extends bsy.Square {
    /**
     * Initialize the square.
     */
    constructor(image, material) {
      super();

      this._texSquare = new bsy.TextureSquare(image);
      this._matSquare = new bsy.MaterialSquare(material);
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this._matSquare.setMaterial(material);
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this._matSquare.getMaterial();
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      return this._matSquare.getVertexNormals();
    }

    /**
     * Set the texture image.
     */
    setTextureImage(image) {
      this._texSquare.setTextureImage(image);
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      return this._texSquare.getTextureImage();
    }

    /**
     * Get the texture coordinates.
     */
    getTextureCoords() {
      return this._texSquare.getTextureCoords();
    }
  }

  bsy.TextureMaterialSquare = TextureMaterialSquare;
})(window.bsy);

