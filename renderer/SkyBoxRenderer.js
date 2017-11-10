(function(bsy) {
  'use strict';

  /** Renderer for a SkyBox. */
  class SkyBoxRenderer extends bsy.IdentityTextureCubeRenderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, skyBox, program) {
      super(gl, skyBox, program);
    }

    /**
     * Do not to use mip mapping.
     */
    useMipMaps() {
      return false;
    }

    /**
     * Render the sky box.
     */
    render(gl, timeDeltaMS, trans) {
      // Depth has to be disable so that objects outside of the skybox are still visible.
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);

      super.render(gl, timeDeltaMS, trans);

      // Re-enable depth testing.
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
    }
  }

  bsy.SkyBoxRenderer = SkyBoxRenderer;
})(window.bsy);

