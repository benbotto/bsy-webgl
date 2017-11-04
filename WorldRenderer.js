(function(bsy) {
  'use strict';

  /** Handles rendering the world. */
  class WorldRenderer extends bsy.Renderer {
    /**
     * Initialize the Renderer.
     */
    constructor(gl, world, program) {
      super(gl, world, program);

      // World-wide transformation.
      this.transform = mat4.create();

      // For the projection matrix.
      this.fov    = 60 * Math.PI / 180;
      this.zNear  = 0.1;
      this.zFar   = 1000.0;

      // TODO: This needs to be changed on window resize, and the projection
      // needs to be adjusted accordingly.
      this.aspect     = null;
      this.updateViewSize();

      // Clear to black.
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Clear everything.
      gl.clearDepth(1.0);

      // Enable depth testing, and ensure that near things obscure far.
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    }

    /**
     * Compute (or recompute) the aspect ratio and projection.
     */
    updateViewSize() {
      const projection = mat4.create();
      const gl         = this.getContext();

      // New aspect ratio.
      this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

      // New projection using that aspect ratio.
      mat4.perspective(projection, this.fov, this.aspect, this.zNear, this.zFar);
      this.setProjection(projection);
    }

    /**
     * Render the world.
     */
    render(gl, timeDeltaMS) {
      // Clear the canvas.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Use the world's program.
      this.useProgram();

      // Render the world.
      this.renderers.forEach(r => r.render(gl, timeDeltaMS, this.transform));
    }
  }

  bsy.WorldRenderer = WorldRenderer;
})(window.bsy);

