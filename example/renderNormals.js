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
    vec4.fromValues(1.9, 2.4, 2.4, 1.0),
    vec4.fromValues(1.3, 1.2, 1.2, 1.0),
    vec4.fromValues(0.8, 0.9, 0.9, 1.0),
    vec3.fromValues(0.0, 0.0, -1.0)
  );
  const sphere = new bsy.MaterialSphere(new bsy.BluePlastic(), 6);
  const square = new bsy.MaterialSquare(new bsy.Brass());

  world.addWorldObject('sphere', sphere);
  world.addWorldObject('square', square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adsProgram))
    .addRenderer(new bsy.ADSWorldObjectRenderer(gl, sphere, adsProgram))
    .addRenderer(new bsy.ADSWorldObjectRenderer(gl, square, adsProgram))
    .addRenderer(new bsy.VertexNormalRenderer(gl, sphere, adsProgram))
    .addRenderer(new bsy.VertexNormalRenderer(gl, square, adsProgram));
 
  // Position the camera.
  camera.moveBackward(10);

  // Position the world objects.
  mat4.fromTranslation(sphere.getTransform(), [3, 0, 0]);
  mat4.fromTranslation(square.getTransform(), [-3, 0, 0]);

  easel.onDraw = (gl, timeDeltaMS) => {
    mat4.rotate(sphere.getTransform(), sphere.getTransform(), Math.PI * timeDeltaMS / 10000, [1, 1, 0]);
    mat4.rotate(square.getTransform(), square.getTransform(), Math.PI * timeDeltaMS / 10000, [1, 1, 0]);
    
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

