(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const adsVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsVert);
  const adsFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsFrag);
  const adsProgram = linker.link(gl, adsVShader, adsFShader);

  // Create the world.
  const camera = new bsy.SixDoFCamera();
  const world  = new bsy.World(camera);
  const light  = new bsy.DistanceLight(
    vec4.fromValues(0.6, 0.4, 0.4, 1.0),
    vec4.fromValues(0.3, 0.2, 0.2, 1.0),
    vec4.fromValues(0.6, 0.5, 0.5, 1.0),
    vec3.fromValues(0.0, 0.0, -1.0)
  );
  const square = new bsy.Square()
    .setMaterial(new bsy.Brass());

  world.addWorldObject('distLight', light);
  world.addWorldObject('square',    square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adsProgram))
    .addRenderer(new bsy.ADSWorldObjectRenderer(gl, square, adsProgram));
 
  // Position the camera.
  camera.moveBackward(10);

  easel.onDraw = (gl, timeDeltaMS) => {
    mat4.rotate(square.getTransform(), square.getTransform(),
      Math.PI * timeDeltaMS / 1000, [0, 1, 0]);
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

