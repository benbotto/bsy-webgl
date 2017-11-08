(function(bsy) {
  'use strict';

  /** Renderer for a cube. */
  class IdentityTextureCubeRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, cube, program) {
      super(gl, cube, program);

      // A TextureCube is made up of 6 TextureSquares, and those can be rendered
      // using the IdentityTextureWorldObjectRenderer.
      this
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('up'),    program, gl.TEXTURE0))
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('down'),  program, gl.TEXTURE1))
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('right'), program, gl.TEXTURE2))
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('left'),  program, gl.TEXTURE3))
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('front'), program, gl.TEXTURE4))
        .addRenderer(new bsy.IdentityTextureWorldObjectRenderer(gl, cube.getWorldObject('back'),  program, gl.TEXTURE5));
    }

    /**
     * Render the cube.
     */
    render(gl, timeDeltaMS, trans) {
      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, this.getWorldObject().getTransform()));
    }
  }

  bsy.IdentityTextureCubeRenderer = IdentityTextureCubeRenderer;
})(window.bsy);

