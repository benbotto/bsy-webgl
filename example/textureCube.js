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

  const idtVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.identityTextureVert);
  const idtFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityTextureFrag);
  const idtProgram = linker.link(gl, idtVShader, idtFShader);

  // Create the world.
  const camera = new bsy.SixDoFCamera();
  const world  = new bsy.World(camera);
  const cube   = new bsy.TextureCube(crateImg);

  world.addWorldObject('cube', cube);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world)
    .addRenderer(new bsy.IdentityTextureCubeRenderer(gl, cube, idtProgram));
 
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

