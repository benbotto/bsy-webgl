(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel(640, 480);
  const gl     = easel.getContext();

  // Vertex shader.
  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
    }
  `;

  // Fragment shader.
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  // Compile and link the vertix and fragment shaders.
  const compiler = new bsy.Compiler();
  const linker   = new bsy.Linker();
  const vShader  = compiler.compile(gl, vsSource, gl.VERTEX_SHADER);
  const fShader  = compiler.compile(gl, fsSource, gl.FRAGMENT_SHADER);
  const program  = linker.link(gl, vShader, fShader);

  // Create the world.
  const world  = new bsy.World();
  const square = new bsy.Square();

  world.addWorldObject('square1', square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world, program)
    .addRenderer(new bsy.SquareRenderer(gl, square, program));

  easel.onDraw = (gl, timeDeltaMS) => worldRenderer.render(gl, timeDeltaMS);
  easel.start();
})(window.bsy);

