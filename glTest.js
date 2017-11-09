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

      const adstVShader = compiler.compile(gl, gl.VERTEX_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsTextureVert);
      const adstFShader = compiler.compile(gl, gl.FRAGMENT_SHADER, bsy.MaterialH, bsy.DistanceLightH, bsy.adsTextureFrag);
      const adstProgram = linker.link(gl, adstVShader, adstFShader);

      // Create the world.
      const world  = new bsy.World();
      const light  = new bsy.DistanceLight(
        vec4.fromValues(0.6, 0.4, 0.4, 1.0),
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
      const matSphere = new bsy.MaterialSphere(new bsy.BluePlastic());
      const crate     = new bsy.TextureCube(crateImg);
      const litCrate  = new bsy.TextureMaterialCube(crateImg, new bsy.Wood());

      world.addWorldObject('distLight', light);
      world.addWorldObject('clrCube',   clrCube);
      world.addWorldObject('matCube',   matCube);
      world.addWorldObject('matSphere', matSphere);
      world.addWorldObject('crate',     crate);
      world.addWorldObject('litCrate',  litCrate);

      const matCubeTrans = matCube.getTransform();
      mat4.translate(matCubeTrans, matCubeTrans, [1.5, 0.0, -12]);

      const clrCubeTrans = clrCube.getTransform();
      mat4.translate(clrCubeTrans, clrCubeTrans, [-1.5, 0.0, -12]);

      const matSphereTrans = matSphere.getTransform();
      const matSphereRot   = mat4.create();
      const matSphereTlate = mat4.fromTranslation(mat4.create(), [0.0, 0.0, -24.0]);

      const crateTrans = crate.getTransform();
      const crateTlate = mat4.fromTranslation(mat4.create, [0.0, -1.5, -12]);
      const crateRot1  = quat.setAxisAngle(quat.create(), [0.0, 1.0, 0.0], 0);
      const crateRot2  = quat.setAxisAngle(quat.create(), [0.0, 1.0, 0.0], Math.PI / 2);

      const litCrateTrans = litCrate.getTransform();
      mat4.translate(litCrateTrans, litCrateTrans, [0.0, 1.5, -12]);

      // Create the renderers.
      // The light is rendered twice, once for each ADS prog.
      const worldRenderer = new bsy.WorldRenderer(gl, world, adsProgram)
        .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adsProgram))
        .addRenderer(new bsy.ColorCubeRenderer(gl, clrCube, idProgram))
        .addRenderer(new bsy.MaterialCubeRenderer(gl, matCube, adsProgram))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, matSphere, adsProgram))
        .addRenderer(new bsy.IdentityTextureCubeRenderer(gl, crate, idtProgram))
        .addRenderer(new bsy.ADSDistanceLightRenderer(gl, light, adstProgram))
        .addRenderer(new bsy.TextureMaterialCubeRenderer(gl, litCrate, adstProgram));

      easel.onDraw = (gl, timeDeltaMS) => {
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
        mat4.rotate(matCubeTrans, matCubeTrans, Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 3000, [1.0, 0.0, 0.0]);
        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);
        mat4.rotate(clrCubeTrans, clrCubeTrans, -Math.PI * timeDeltaMS / 5000, [0.0, 0.0, 1.0]);

        mat4.rotate(litCrateTrans, litCrateTrans, -Math.PI * timeDeltaMS / 4000, [0.0, 1.0, 0.0]);

        mat4.multiply(crateTrans, crateTlate, mat4.fromQuat(mat4.create(),
          quat.slerp(crateRot1, crateRot1, crateRot2, 1 * timeDeltaMS / 500)));

        if (Math.abs(quat.dot(crateRot1, crateRot2)) > .999)
          quat.rotateY(crateRot2, crateRot2, Math.PI / 2);

        mat4.rotate(matSphereRot, matSphereRot, Math.PI * timeDeltaMS / 8000, [1.0, 1.0, 0.0]);
        mat4.multiply(matSphereTrans, matSphereRot, matSphereTlate);

        worldRenderer.render(gl, timeDeltaMS);
      };

      easel.onresize = () => worldRenderer.updateViewSize();

      easel.start();
    });
})(window.bsy);

