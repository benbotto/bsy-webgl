(function(bsy) {
  'use strict';

  /** A 3D cube. */
  class Cube extends bsy.WorldObject {
    /**
     * Initialize the cube.
     */
    constructor(colors) {
      super();

      // Defaults to all white.
      if (!colors)
        colors = Array.from({length: 6}, () => [1.0, 1.0, 1.0, 1.0]);
      else if (colors.length !== 6)
        throw new Error('6 colors are required.');

      // The cube is made up of 6 squares.
      const up    = new bsy.Square(colors[0]);
      const down  = new bsy.Square(colors[1]);
      const right = new bsy.Square(colors[2]);
      const left  = new bsy.Square(colors[3]);
      const front = new bsy.Square(colors[4]);
      const back  = new bsy.Square(colors[5]);

      let trans;

      // Up: Rotated about x then translated +y.
      trans = up.getTransform();
      mat4.translate(trans, trans, [0.0, 0.5, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [1.0, 0.0, 0.0]);
      this.addWorldObject('up', up);

      // Down: Rotated about x then translated -y.
      trans = down.getTransform();
      mat4.translate(trans, trans, [0.0, -0.5, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [1.0, 0.0, 0.0]);
      this.addWorldObject('down', down);

      // Right: rotated about y then translated +x.
      trans = right.getTransform();
      mat4.translate(trans, trans, [0.5, 0.0, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [0.0, 1.0, 0.0]);
      this.addWorldObject('right', right);

      // Left: rotated about y then translated -x.
      trans = left.getTransform();
      mat4.translate(trans, trans, [-0.5, 0.0, 0.0]);
      mat4.rotate(trans, trans, Math.PI / 2, [0.0, 1.0, 0.0]);
      this.addWorldObject('left', left);

      // Front: translated +z.
      trans = front.getTransform();
      mat4.translate(trans, trans, [0.0, 0.0, 0.5]);
      this.addWorldObject('front', front);

      // Back: translated -z.
      trans = back.getTransform();
      mat4.translate(trans, trans, [0.0, 0.0, -0.5]);
      this.addWorldObject('back', back);
    }
  }

  bsy.Cube = Cube;
})(window.bsy);

