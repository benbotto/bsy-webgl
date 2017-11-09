(function(bsy) {
  'use strict';

  /** Renderer for a cube. */
  class TextureMaterialCubeRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, cube, program) {
      super(gl, cube, program);

      // A TextureMaterialCube is made up of 6 TextureMaterialSquares, and
      // those can be rendered using the ADSTextureWorldObjectRenderer.
      this
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('up'),    program))
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('down'),  program))
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('right'), program))
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('left'),  program))
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('front'), program))
        .addRenderer(new bsy.ADSTextureWorldObjectRenderer(gl, cube.getWorldObject('back'),  program));
    }

    /**
     * Render the cube.
     */
    render(gl, timeDeltaMS, trans) {
      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, this.getWorldObject().getTransform()));
    }
  }

  bsy.TextureMaterialCubeRenderer = TextureMaterialCubeRenderer;
})(window.bsy);

