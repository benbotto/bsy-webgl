(function(bsy) {
  'use strict';

  /** A 3D cube with a texture. */
  class TextureCube extends bsy.Cube {
    /**
     * Initialize the cube.
     */
    constructor(image) {
      super();

      this.setTextureImage(image);
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.TextureSquare());
      this.addWorldObject('down',  new bsy.TextureSquare());
      this.addWorldObject('right', new bsy.TextureSquare());
      this.addWorldObject('left',  new bsy.TextureSquare());
      this.addWorldObject('front', new bsy.TextureSquare());
      this.addWorldObject('back',  new bsy.TextureSquare());
    }

    /**
     * Set the texture image.
     */
    setTextureImage(image) {
      this.textureImage = image;

      this.getWorldObject('up').setTextureImage(image);
      this.getWorldObject('down').setTextureImage(image);
      this.getWorldObject('right').setTextureImage(image);
      this.getWorldObject('left').setTextureImage(image);
      this.getWorldObject('front').setTextureImage(image);
      this.getWorldObject('back').setTextureImage(image);
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      return this.textureImage;
    }
  }

  bsy.TextureCube = TextureCube;
})(window.bsy);

