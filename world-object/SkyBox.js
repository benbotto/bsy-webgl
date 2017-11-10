(function(bsy) {
  'use strict';

  /** A sky box wtih six images.. */
  class SkyBox extends bsy.Cube {
    /**
     * Init.  Images must be in order: up, down, right, left, front, back.
     */
    constructor(camera, images) {
      super();

      this.camera = camera;
      this.scale  = mat4.scale(mat4.create(), mat4.create(), [1, 1, 1]);
      this.setTextureImages(images);
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
     * Set the texture images.
     */
    setTextureImages(images) {
      if (images.length !== 6)
        throw new Error('Six images must be provided.');

      this.textureImages = images;

      this.getWorldObject('up').setTextureImage(images[0]);
      this.getWorldObject('down').setTextureImage(images[1]);
      this.getWorldObject('right').setTextureImage(images[2]);
      this.getWorldObject('left').setTextureImage(images[3]);
      this.getWorldObject('front').setTextureImage(images[4]);
      this.getWorldObject('back').setTextureImage(images[5]);
    }

    /**
     * Get the texture images.
     */
    getTextureImages() {
      return this.textureImages;
    }

    /**
     * Get the location, which is the same as the camera's.
     */
    getLocation() {
      return this.camera.getLocation();
    }

    /**
     * Get the scale transform of the SkyBox (defaults to [1, 1, 1]).
     */
    getScale() {
      return this.scale;
    }

    /**
     * Get the transform, which is the scale and the location.
     */
    getTransform() {
      return mat4.multiply(
        mat4.create(),
        mat4.translate(mat4.create(), mat4.create(), this.getLocation()),
        this.getScale());
    }
  }

  bsy.SkyBox = SkyBox;
})(window.bsy)

