(function(bsy) {
  'use strict';

  /** A 3D cube with a texture and material. */
  class TextureMaterialCube extends bsy.Cube {
    /**
     * Initialize the cube.
     */
    constructor(image, material) {
      super();

      this.setTextureImage(image);
      this.setMaterial(material);
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.TextureMaterialSquare());
      this.addWorldObject('down',  new bsy.TextureMaterialSquare());
      this.addWorldObject('right', new bsy.TextureMaterialSquare());
      this.addWorldObject('left',  new bsy.TextureMaterialSquare());
      this.addWorldObject('front', new bsy.TextureMaterialSquare());
      this.addWorldObject('back',  new bsy.TextureMaterialSquare());
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

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;

      this.getWorldObject('up').setMaterial(material);
      this.getWorldObject('down').setMaterial(material);
      this.getWorldObject('right').setMaterial(material);
      this.getWorldObject('left').setMaterial(material);
      this.getWorldObject('front').setMaterial(material);
      this.getWorldObject('back').setMaterial(material);
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }
  }

  bsy.TextureMaterialCube = TextureMaterialCube;
})(window.bsy);

