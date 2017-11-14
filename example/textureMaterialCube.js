(async function(bsy) {
  'use strict';

  // Load the texutres for the scene.
  const crateImg = await new bsy.TextureMgr()
    .loadImage('/example/RTS_Crate_0.png');

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  // Compile and link the vertix and fragment shaders.
  const compiler   = new bsy.Compiler();
  const linker     = new bsy.Linker();

  const adstVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsTextureVert);
  const adstFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsTextureFrag);
  const adstProgram = linker.link(gl, adstVShader, adstFShader);

  // Create the world.
  const camera = new bsy.SixDoFCamera();
  const world  = new bsy.World(camera);
  const light  = new bsy.DistanceLight(
    vec4.fromValues(1.9, 2.4, 2.4, 1.0),
    vec4.fromValues(1.3, 1.2, 1.2, 1.0),
    vec4.fromValues(0.8, 0.9, 0.9, 1.0),
    vec3.fromValues(0.0, 0.0, -1.0)
  );
  const cube   = new bsy.TextureMaterialCube(crateImg, new bsy.Wood());

  world.addWorldObject('distLight', light);
  world.addWorldObject('cube',      cube);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adstProgram))
    .addRenderer(new bsy.TextureMaterialCubeRenderer(gl, cube, adstProgram));
 
  // Position the camera.
  camera.moveBackward(10);

  easel.onDraw = (gl, timeDeltaMS) => {
    mat4.rotate(cube.getTransform(), cube.getTransform(),
      Math.PI * timeDeltaMS / 3000, [1, 0, 1]);
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

