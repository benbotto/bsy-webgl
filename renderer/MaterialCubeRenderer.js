(function(bsy) {
  'use strict';

  /** Renderer for a cube. */
  class MaterialCubeRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, cube, program) {
      super(gl, cube, program);

      // A MaterialCube is made up of 6 MaterialSquares, and those can be rendered
      // using the ADSWorldObjectRenderer.
      this
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('up'),    program))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('down'),  program))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('right'), program))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('left'),  program))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('front'), program))
        .addRenderer(new bsy.ADSWorldObjectRenderer(gl, cube.getWorldObject('back'),  program));
    }

    /**
     * Render the cube.
     */
    render(gl, timeDeltaMS, trans) {
      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, this.getWorldObject().getTransform()));
    }
  }

  bsy.MaterialCubeRenderer = MaterialCubeRenderer;
})(window.bsy);

