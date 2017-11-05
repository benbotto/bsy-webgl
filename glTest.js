(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel();
  const gl     = easel.getContext();

  // Compile and link the vertix and fragment shaders.
  const compiler = new bsy.Compiler();
  const linker   = new bsy.Linker();
  const vShader  = compiler.compile(gl, bsy.identityVert, gl.VERTEX_SHADER);
  const fShader  = compiler.compile(gl, bsy.identityFrag, gl.FRAGMENT_SHADER);
  const program  = linker.link(gl, vShader, fShader);

  // Create the world.
  const world  = new bsy.World();
  const square = new bsy.Square([1.0, 0.0, 1.0, 1.0])
  const cube   = new bsy.Cube([
    [0.0, 0.0, 1.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [1.0, 1.0, 0.0, 1.0]
  ]);

  world.addWorldObject('square1', square);
  world.addWorldObject('cube1',   cube);

  const squareTrans = square.getTransform();
  mat4.translate(squareTrans, squareTrans, [0, 0, -6]);

  const cubeTrans = cube.getTransform();
  mat4.translate(cubeTrans, cubeTrans, [1.5, -1.5, -6]);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world, program)
    .addRenderer(new bsy.SquareRenderer(gl, square, program))
    .addRenderer(new bsy.CubeRenderer(gl, cube, program));

  easel.onDraw = (gl, timeDeltaMS) => {
    mat4.translate(squareTrans, squareTrans, [.001, .001, -.001]);

    mat4.rotate(cubeTrans, cubeTrans, Math.PI * timeDeltaMS / 1000, [1.0, 0.0, 0.0]);
    mat4.rotate(cubeTrans, cubeTrans, Math.PI * timeDeltaMS / 2000, [0.0, 1.0, 0.0]);
    mat4.rotate(cubeTrans, cubeTrans, Math.PI * timeDeltaMS / 3000, [0.0, 0.0, 1.0]);

    worldRenderer.render(gl, timeDeltaMS);
  };

  easel.start();
})(window.bsy);

