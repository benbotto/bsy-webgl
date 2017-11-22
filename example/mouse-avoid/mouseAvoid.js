(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  const NUM_PART_COLS = 200;
  //const NUM_PART_ROWS = Math.floor(NUM_PART_COLS * gl.drawingBufferHeight / gl.drawingBufferWidth);
  const NUM_PART_ROWS = 50;
  const PART_WIDTH    = 1.1;

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const maVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.mouseAvoidVert);
  const idFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityFrag);
  const maProgram = linker.link(gl, maVShader, idFShader);

  // Create the world.
  const camera  = new bsy.SixDoFCamera();
  const world   = new bsy.World(camera);
  const emitter = new bsy.ParticleEmitter();

  // Add the particles.
  const color  = [0.2, 0.2, 0.2, 1];
  const startX = -NUM_PART_COLS / 2 * PART_WIDTH + PART_WIDTH / 2;
  const startY = -NUM_PART_ROWS / 2 * PART_WIDTH + PART_WIDTH / 2;

  for (let x = 0; x < NUM_PART_COLS; ++x) {
    for (let y = 0; y < NUM_PART_ROWS; ++y) {
      const particle = new bsy.Particle(new bsy.Square().setColor(color))
        .translate([startX + x * PART_WIDTH, startY + y * PART_WIDTH, 0]);
      emitter.addWorldObject(`particle_${x}_${y}`, particle);
    }
  }

  world.addWorldObject('emitter', emitter);

  // Create the renderers.
  const worldRenderer      = new bsy.WorldRenderer(gl, world);
  const mouseAvoidRenderer = new bsy.MouseAvoidRenderer(gl, emitter, maProgram);

  worldRenderer.addRenderer(mouseAvoidRenderer);
 
  // Position the camera.
  camera.moveBackward(NUM_PART_COLS);

  // Keep track of the mouse position.
  let lastMousePos = vec2.create();
  let mouseChanged = true;

  gl.canvas.onmousemove = e => {
    lastMousePos[0] = e.clientX;
    lastMousePos[1] = e.clientY;
    mouseChanged    = true;
  };

  easel.onDraw = (gl, timeDeltaMS) => {
    if (!mouseChanged)
      return;

    // Convert the mouse coordinates to world space.
    mouseAvoidRenderer.setMouseWorldPos(
      bsy.MatUtils.mouseCoordsToWorldCoordsAtDepth(
        worldRenderer, lastMousePos[0], lastMousePos[1], 0));
    mouseChanged = false;

    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

