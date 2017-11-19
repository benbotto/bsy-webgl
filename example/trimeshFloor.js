(async function(bsy) {
  'use strict';

  // Load the texutres for the scene.
  const crateImg = await new bsy.TextureMgr()
    .loadImage('/example/floor.png');

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
  const floor = new bsy.Trimesh(20, 20, () => Math.random() - .5)
    .setTextureImage(crateImg)
    .setMaterial(new bsy.Wood());

  world.addWorldObject('distLight', light);
  world.addWorldObject('floor',     floor);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adstProgram))
    .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, floor, adstProgram));
 
  // Position the camera.
  camera
    .strafeLeft(20)
    .moveUp(10)
    .yaw(-Math.PI / 2)
    .pitch(-Math.PI / 6);

  easel.onDraw = (gl, timeDeltaMS) => {
    worldRenderer.render(gl, timeDeltaMS);
  };

  // Update the canvas size with the window size is changed.
  easel.onresize = () => worldRenderer.updateViewSize();

  // Start rendering.
  easel.start();
})(window.bsy);

