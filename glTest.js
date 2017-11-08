(function(bsy) {
  'use strict';

  new bsy.TextureMgr()
    .loadImage('/RTS_Crate_0.png')
    .then(crateImg => {
      const easel  = new bsy.Easel();
      const gl     = easel.getContext();

      // Compile and link the vertix and fragment shaders.
      const compiler   = new bsy.Compiler();
      const linker     = new bsy.Linker();

      const idVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.identityVert);
      const idFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityFrag);
      const idProgram = linker.link(gl, idVShader, idFShader);

      const idtVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.identityTextureVert);
      const idtFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.identityTextureFrag);
      const idtProgram = linker.link(gl, idtVShader, idtFShader);

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
      const crate     = new bsy.TextureCube(crateImg);

      world.addWorldObject('distLight', light);
      world.addWorldObject('clrCube',   clrCube);
      world.addWorldObject('matCube',   matCube);
      world.addWorldObject('matSphere', matSphere);
      world.addWorldObject('crate',     crate);

      const matCubeTrans = matCube.getTransform();
      mat4.translate(matCubeTrans, matCubeTrans, [1.5, 0.0, -12]);

      const clrCubeTrans = clrCube.getTransform();
      mat4.translate(clrCubeTrans, clrCubeTrans, [-1.5, 0.0, -12]);

      const matSphereTrans = matSphere.getTransform();
      const matSphereRot   = mat4.create();
      const matSphereTlate = mat4.fromTranslation(mat4.create(), [0.0, 0.0, -24.0]);

      const crateTrans = crate.getTransform();
      mat4.translate(crateTrans, crateTrans, [0., -1.5, -12]);

      // Create the renderers.
      const worldRenderer = new bsy.WorldRenderer(gl, world, adsProgram)
        .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adsProgram))
        .addRenderer(new bsy.ColorCubeRenderer(gl, clrCube, idProgram))
        .addRenderer(new bsy.MaterialCubeRenderer(gl, matCube, adsProgram))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, matSphere, adsProgram))
        .addRenderer(new bsy.IdentityTextureCubeRenderer(gl, crate, idtProgram));

      easel.onDraw = (gl, timeDeltaMS) => {
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

        mat4.rotate(crateTrans, crateTrans, -Math.PI * timeDeltaMS / 3000, [0.0, 1.0, 0.0]);
        mat4.rotate(crateTrans, crateTrans,  Math.PI * timeDeltaMS / 4000, [1.0, 0.0, 0.0]);
        mat4.rotate(crateTrans, crateTrans, -Math.PI * timeDeltaMS / 4000, [0.0, 0.0, 1.0]);

        mat4.rotate(matSphereRot, matSphereRot, Math.PI * timeDeltaMS / 8000, [1.0, 1.0, 0.0]);
        mat4.multiply(matSphereTrans, matSphereRot, matSphereTlate);

        worldRenderer.render(gl, timeDeltaMS);
      };

      easel.start();
    });
})(window.bsy);

