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

  const adsVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsVert);
  const adsFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsFrag);
  const adsProgram = linker.link(gl, adsVShader, adsFShader);

  // Create the world.
  const world  = new bsy.World();
  const light  = new bsy.DistanceLight(
    vec4.fromValues(0.2, 0.1, 0.1, 1.0),
    vec4.fromValues(0.3, 0.2, 0.2, 1.0),
    vec4.fromValues(0.6, 0.5, 0.5, 1.0),
    vec3.fromValues(0.0, 0.0, -1.0)
  );
  const clrCube = new bsy.ColorCube([
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 1.0, 0.0, 1.0]
  ]);
  const matCube   = new bsy.MaterialCube(new bsy.Brass());
  const matSphere = new bsy.MaterialSphere(new bsy.Brass());

  world.addWorldObject('distLight', light);
  world.addWorldObject('clrCube',   clrCube);
  world.addWorldObject('matCube',   matCube);
  world.addWorldObject('matSphere', matSphere);

  const matCubeTrans = matCube.getTransform();
  mat4.translate(matCubeTrans, matCubeTrans, [1.5, 0.0, -6]);

  const clrCubeTrans = clrCube.getTransform();
  mat4.translate(clrCubeTrans, clrCubeTrans, [-1.5, 0.0, -6]);

  const matSphereTrans = matSphere.getTransform();
  mat4.translate(matSphereTrans, matSphereTrans, [0.0, 1.5, -6]);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world, adsProgram)
    .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adsProgram))
    .addRenderer(new bsy.ColorCubeRenderer(gl, clrCube, idProgram))
    .addRenderer(new bsy.MaterialCubeRenderer(gl, matCube, adsProgram))
    .addRenderer(new bsy.ADSWorldObjectRenderer(gl, matSphere, adsProgram));

  easel.onDraw = (gl, timeDeltaMS) => {
    mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
    mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
    mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

    mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
    mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
    mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

    worldRenderer.render(gl, timeDeltaMS);
  };

  easel.start();
})(window.bsy);

