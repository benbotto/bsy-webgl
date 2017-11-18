(function(bsy) {
  'use strict';

  /** A 3D cube. */
  class Cube extends bsy.WorldObject {
    /**
     * Initialize the cube.
     */
    constructor() {
      super();

      // The cube is made up of 6 squares -- create them.
      this._createCubeFaces();

      const up    = this.getWorldObject('up');
      const down  = this.getWorldObject('down');
      const right = this.getWorldObject('right');
      const left  = this.getWorldObject('left');
      const front = this.getWorldObject('front');
      const back  = this.getWorldObject('back');

      let trans;

      // Up: Rotated about x then translated +y.
      trans = up.getTransform();
      mat4.translate(trans, trans, [0.0, 0.5, 0.0]);
      mat4.rotate(trans, trans, -Math.PI / 2, [1.0, 0.0, 0.0]);

      // Down: Rotated about x then translated -y.
      trans = down.getTransform();
      mat4.translate(trans, trans, [0.0, -0.5, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [1.0, 0.0, 0.0]);

      // Right: rotated about y then translated +x.
      trans = right.getTransform();
      mat4.translate(trans, trans, [0.5, 0.0, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [0.0, 1.0, 0.0]);

      // Left: rotated about y then translated -x.
      trans = left.getTransform();
      mat4.translate(trans, trans, [-0.5, 0.0, 0.0]);
      mat4.rotate(trans, trans, -Math.PI / 2, [0.0, 1.0, 0.0]);

      // Front: translated +z.
      trans = front.getTransform();
      mat4.translate(trans, trans, [0.0, 0.0, 0.5]);

      // Back: rotated about y then translated -z.
      trans = back.getTransform();
      mat4.translate(trans, trans, [0.0, 0.0, -0.5]);
      mat4.rotate(trans, trans, Math.PI, [0.0, 1.0, 0.0]);
    }

    /**
     * Protected helper to create the cube faces.
     */
    _createCubeFaces() {
      // The cube is made up of 6 squares.
      this.addWorldObject('up',    new bsy.Square());
      this.addWorldObject('down',  new bsy.Square());
      this.addWorldObject('right', new bsy.Square());
      this.addWorldObject('left',  new bsy.Square());
      this.addWorldObject('front', new bsy.Square());
      this.addWorldObject('back',  new bsy.Square());
    }

    /**
     * Set the colors.
     */
    setColors(colors) {
      // Defaults to all white.
      if (colors.length !== 6)
        throw new Error('6 colors are required.');

      this.getWorldObject('up').setColor(colors[0]);
      this.getWorldObject('down').setColor(colors[1]);
      this.getWorldObject('right').setColor(colors[2]);
      this.getWorldObject('left').setColor(colors[3]);
      this.getWorldObject('front').setColor(colors[4]);
      this.getWorldObject('back').setColor(colors[5]);

      return this;
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

      this.getWorldObject('up').setTextureImage(image);
      this.getWorldObject('down').setTextureImage(image);
      this.getWorldObject('right').setTextureImage(image);
      this.getWorldObject('left').setTextureImage(image);
      this.getWorldObject('front').setTextureImage(image);
      this.getWorldObject('back').setTextureImage(image);

      return this;
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      return this.textureImage;
    }
  }

  bsy.Cube = Cube;
})(window.bsy);

