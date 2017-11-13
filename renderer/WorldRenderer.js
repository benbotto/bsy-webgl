(function(bsy) {
  'use strict';

  /** Handles rendering the world. */
  class WorldRenderer extends bsy.Renderer {
    /**
     * Initialize the Renderer.
     */
    constructor(gl, world) {
      super(gl, world);

      // World-wide transformation.
      this.transform = mat4.create();

      // For the projection matrix.
      this.fov    = 35 * Math.PI / 180;
      this.zNear  = 0.1;
      this.zFar   = 1000.0;
      this.aspect = null;
      this.updateViewSize();

      // The view comes from the world's camera.  The view is updated on each
      // render() call.
      this.setView(this.getWorldObject().getCamera().getView());

      // Clear to black.
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Clear everything.
      gl.clearDepth(1.0);

      // Enable depth testing, and ensure that near things obscure far.
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    }

    /**
     * Get this World's transformation matrix.
     */
    getTransform() {
      return this.transform;
    }

    /**
     * Set this World's transformation matrix.
     */
    setTransform(trans) {
      this.transform = trans;

      return this;
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
     * Clear the canvas.
     */
    clear() {
      const gl = this.getContext();

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Render the world.
     */
    render(gl, timeDeltaMS) {
      this.clear();
      this.setView(this.getWorldObject().getCamera().getView());
      this.renderers.forEach(r => r.render(gl, timeDeltaMS, this.getTransform()));
    }
  }

  bsy.WorldRenderer = WorldRenderer;
})(window.bsy);

