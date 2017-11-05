(function(bsy) {
  'use strict';

  /** Renderer for a cube. */
  class ColorCubeRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, cube, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, cube, program);

      // A ColorCube is made up of 6 ColorSquares, and those can be rendered
      // using the IdentityWorldObjectRenderer.
      this
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('up'),    program))
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('down'),  program))
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('right'), program))
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('left'),  program))
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('front'), program))
        .addRenderer(new bsy.IdentityWorldObjectRenderer(gl, cube.getWorldObject('back'),  program));
    }

    /**
     * Render the cube.
     */
    render(gl, timeDeltaMS, trans) {
      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, this.getWorldObject().getTransform()));
    }
  }

  bsy.ColorCubeRenderer = ColorCubeRenderer;
})(window.bsy);

