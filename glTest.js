(function(bsy) {
  'use strict';

  const easel  = new bsy.Easel(640, 480);
  const gl     = easel.getContext();

  // Vertex shader.
  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 color;

    void main() {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
      color       = aVertexColor;
    }
  `;

  // Fragment shader.
  const fsSource = `
    varying lowp vec4 color;

    void main() {
      gl_FragColor = color;
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
  const square = new bsy.Square([1.0, 0.0, 1.0, 1.0])
    .setLocation(vec3.fromValues(0, 0, -6));

  world.addWorldObject('square1', square);

  // Create the renderers.
  const worldRenderer = new bsy.WorldRenderer(gl, world, program)
    .addRenderer(new bsy.SquareRenderer(gl, square, program));

  easel.onDraw = (gl, timeDeltaMS) => {
    const loc  = square.getLocation();
    const move = vec3.fromValues(.001, .001, -.001);

    vec3.add(loc, loc, move);
    square.setLocation(loc);

    worldRenderer.render(gl, timeDeltaMS);
  };

  easel.start();
})(window.bsy);

