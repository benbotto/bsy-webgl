(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  const NUM_PARTS = 3000;

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const nVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.noiseSquareVert);
  const nFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.noise3D, bsy.noiseSquareFrag);
  const nProgram = linker.link(gl, nVShader, nFShader);

  // Create the world.
  const camera  = new bsy.SixDoFCamera();
  const world   = new bsy.World(camera);
  const square  = new bsy.Square()
    .setColor([0, .1, .3, 1]);

  world.addWorldObject('square', square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.NoiseSquareRenderer(gl, square, nProgram));
 
  // Position the camera.
  camera.moveBackward(.5);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

