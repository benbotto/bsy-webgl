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
  camera
    .moveBackward(NUM_PART_COLS)
    .strafeLeft(3);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  gl.canvas.onmousemove = e => {
    // START WORKING
    /*
    const mousePos = vec3.fromValues(e.clientX, e.clientY, 0);

    // The world position will always be between -1 and 1.
    const worldPos = vec4.fromValues(
      mousePos[0] / gl.canvas.clientWidth  *  2 - 1,
      mousePos[1] / gl.canvas.clientHeight * -2 + 1,
      0, 1);
    
    // Now use the view and projection matrices to figure out where the mouse
    // is when z is at 0.
    const viewMat = camera.getView();
    const projMat = worldRenderer.getProjection();

    worldPos[2] = vec3.transformMat4(vec3.create(), [0, 0, -20], projMat)[2];

    const worldTrans = mat4.create();
    mat4.invert(worldTrans,
      mat4.multiply(worldTrans, projMat, viewMat));

    vec4.transformMat4(worldPos, worldPos, worldTrans);

    vec4.scale(worldPos, worldPos, 1.0 / worldPos[3]);
    console.log(worldPos);
    // END WORKING
    */

    // The clipspace position will always be between -1 and 1.
    const clipPos = vec4.fromValues(
      e.clientX / gl.canvas.clientWidth  *  2 - 1,
      e.clientY / gl.canvas.clientHeight * -2 + 1,
      0, 1);
    
    // Now use the view and projection matrices to figure out the z coordinate,
    // which too lies between -1 and 1.
    const viewMat  = camera.getView();
    const projMat  = worldRenderer.getProjection();
    const viewProj = mat4.multiply(mat4.create(), projMat, viewMat);

    //console.log(vec3.transformMat4(vec3.create(), [0,0,0], mat4.multiply(mat4.create(),
    //  projMat, viewMat)));
    const viewPos = vec3.transformMat4(vec3.create(), [0, 0, 0], viewProj);
    console.log('viewPos', viewPos);

    //worldPos[2] = vec3.transformMat4(vec3.create(), [0, 0, -20], projMat)[2];
    //worldPos[2] = vec3.transformMat4(vec3.create(), viewPos, projMat)[2];
    clipPos[2] = viewPos[2];

    const worldTrans = mat4.invert(mat4.create, viewProj);

    vec4.transformMat4(clipPos, clipPos, worldTrans);
    vec4.scale(clipPos, clipPos, 1.0 / clipPos[3]);
    console.log(clipPos);

    /*
    //vec4.transformMat4(worldPos, worldPos, viewMat);
    //vec4.transformMat4(worldPos, worldPos, projMat);
    const worldTrans = mat4.create();
    //mat4.transpose(worldTrans,
    //  mat4.invert(worldTrans,
    //    mat4.multiply(worldTrans, viewMat, projMat)));
    
    mat4.invert(worldTrans,
      mat4.multiply(worldTrans, projMat, viewMat));
    //mat4.invert(worldTrans, viewMat);

    //worldPos[0] *= worldRenderer.zNear;
    //worldPos[1] *= worldRenderer.zNear;
    //worldPos[2] = worldRenderer.zFar;
    //worldPos[3] = worldRenderer.zFar;

    vec4.transformMat4(worldPos, worldPos, worldTrans);
    //vec4.scale(worldPos, worldPos, 1.0 / worldPos[3]);
    vec4.scale(worldPos, worldPos, worldPos[3]);

    //worldPos[3] = 1.0 / worldPos[3];
    //worldPos[0] *= worldPos[3];
    //worldPos[1] *= worldPos[3];
    //worldPos[2] *= worldPos[3];
    */
  };

  // Start rendering.
  easel.start();
})(window.bsy);

