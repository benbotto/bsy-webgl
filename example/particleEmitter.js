(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const idVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.identityVert);
  const idFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityFrag);
  const idProgram = linker.link(gl, idVShader, idFShader);

  // Create the world.
  const camera = new bsy.SixDoFCamera();
  const world  = new bsy.World(camera);
  const square = new bsy.ParticleEmitter(10);

  world.addWorldObject('square', square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, square, idProgram));
 
  // Position the camera.
  camera.moveBackward(10);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

