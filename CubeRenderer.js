(function(bsy) {
  'use strict';

  /** Renderer for a cube. */
  class CubeRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, cube, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, cube, program);

      // A CubeRenderer is made up of 6 square renderers.
      this
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('up'),    program))
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('down'),  program))
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('right'), program))
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('left'),  program))
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('front'), program))
        .addRenderer(new bsy.SquareRenderer(gl, cube.getWorldObject('back'),  program));
    }

    /**
     * Render the cube.
     */
    render(gl, timeDeltaMS, trans) {
      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, this.getWorldObject().getTransform()));
    }
  }

  bsy.CubeRenderer = CubeRenderer;
})(window.bsy);

