(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  const NUM_PARTS = 5000;

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const peVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.particleEmitterVert);
  const peFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityFrag);
  const peProgram = linker.link(gl, peVShader, peFShader);

  // Create the world.
  const camera  = new bsy.SixDoFCamera();
  const world   = new bsy.World(camera);
  const emitter = new bsy.ParticleEmitter();

  // Add the particles.
  for (let i = 0; i < NUM_PARTS; ++i) {
    const randColor = Array
      .from({length: 3}, () => Math.random())
      .concat(1);

    const randVelocity = Array.from({length: 3}, () => Math.random() * 40 - 20);

    const particle     = new bsy.Particle(new bsy.Circle(10))
      .setColor(randColor)
      .setVelocity(randVelocity)
      .setLifetime(Math.random() * 5);

    emitter.addWorldObject(`particle_${i}`, particle);
  }

  world.addWorldObject('emitter', emitter);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
  const partRenderer  = new bsy.ParticleEmitterRenderer(gl, emitter, peProgram);

  worldRenderer.addRenderer(partRenderer);
 
  // Position the camera.
  camera.moveBackward(150);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // On click toggle gravity.
  gl.canvas.onclick = (e) => {
    partRenderer.toggleGravity();

    // Convert the mouse coordinates to world space.
    const clickPos = bsy.MatUtils.mouseCoordsToWorldCoordsAtDepth(
      worldRenderer, e.clientX, e.clientY, 0);

    mat4.fromTranslation(emitter.getTransform(), clickPos);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

