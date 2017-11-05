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
      mat4.rotate(trans, trans, -Math.PI / 2, [0.0, 1.0, 0.0]);

      // Left: rotated about y then translated -x.
      trans = left.getTransform();
      mat4.translate(trans, trans, [-0.5, 0.0, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [0.0, 1.0, 0.0]);

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
      throw new Error('_createCubeFaces() not implemented.');
    }
  }

  bsy.Cube = Cube;
})(window.bsy);

