(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  const NUM_PART_COLS = 20;
  const NUM_PART_ROWS = Math.floor(NUM_PART_COLS * gl.drawingBufferHeight / gl.drawingBufferWidth);
  const PART_WIDTH    = 1.1;

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const idVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.identityVert);
  const idFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityFrag);
  const idProgram = linker.link(gl, idVShader, idFShader);

  // Create the world.
  const camera  = new bsy.SixDoFCamera();
  const world   = new bsy.World(camera);
  const emitter = new bsy.ParticleEmitter();

  // Add the particles.
  const color  = [0.2, 0.2, 0.2, 1];
  const startX = -NUM_PART_COLS / 2 * PART_WIDTH + PART_WIDTH / 2;
  const startY = -NUM_PART_ROWS / 2 * PART_WIDTH + PART_WIDTH / 2;
  console.log(startX, startY);

  for (let x = 0; x < NUM_PART_COLS; ++x) {
    for (let y = 0; y < NUM_PART_ROWS; ++y) {
      const particle = new bsy.Particle(new bsy.Square().setColor(color))
        .translate([startX + x * PART_WIDTH, startY + y * PART_WIDTH, 0]);
      emitter.addWorldObject(`particle_${x}_${y}`, particle);
    }
  }

  world.addWorldObject('emitter', emitter);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, emitter, idProgram));
 
  // Position the camera.
  camera.moveBackward(NUM_PART_COLS);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  gl.canvas.onmousemove = e => {
    const viewMat  = camera.getView();
    const projMat  = worldRenderer.getProjection();
    const viewProj = mat4.multiply(mat4.create(), projMat, viewMat);

    // The clipspace position will always be between -1 and 1.
    const clipPos = vec4.fromValues(
      e.clientX / gl.canvas.clientWidth  *  2 - 1,
      e.clientY / gl.canvas.clientHeight * -2 + 1,
      0, 1);
    
    // Now use the view and projection matrices to figure out the z coordinate.
    // [0, 0, 0] is a point in world space.
    const projectedPos = vec3.transformMat4(vec3.create(), [0, 0, 0], viewProj);

    // This is where z = 0 lies after projection.
    clipPos[2] = projectedPos[2];

    // Finally, invert the projection * view to find where the mouse is in
    // world coordinates.
    const worldTrans = mat4.invert(mat4.create, viewProj);
    const worldPos   = vec3.transformMat4(vec3.create(), clipPos, worldTrans);
  };

  // Start rendering.
  easel.start();
})(window.bsy);

