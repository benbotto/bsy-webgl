(function(global) {
  'use strict';

  /** Handles rendering the world. */
  class Renderer {
    /**
     * Initialize the Renderer.
     */
    constructor(gl, world) {
      this.gl     = gl;
      this.world  = world;
      this.fov    = 60 * Math.PI / 180;
      this.zNear  = 0.1;
      this.zFar   = 1000.0;

      // TODO: This needs to be changed on window resize, and the projection
      // needs to be adjusted accordingly.
      this.aspect     = null;
      this.projection = null;
      this.updateViewSize();

      // Rendering times.
      this.startTime  = null;
      this.lastTime   = null;
    }

    /**
     * Compute (or recompute) the aspect ratio and projection.
     */
    updateViewSize() {
      // New aspect ratio.
      this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;

      // New projection using that aspect ratio.
      this.projection = mat4.create();
      mat4.perspective(this.projection, this.fov, this.aspect, this.zNear, this.zFar);
    }

    /**
     * Start the rendering.
     */
    start() {
      // Clear to black.
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Clear everything.
      this.gl.clearDepth(1.0);

      // Enable depth testing, and ensure that near things obscure far.
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);

      // Start the rendering.
      this.startTime = new Date();
      this.lastTime  = new Date();
      window.requestAnimationFrame(() => this.render());

      return this;
    }

    /**
     * Render the world.
     */
    render() {
      // Time delta is needed on each render so that object can be moved
      // correctly despite the speed of the device.
      let curTime     = new Date();
      let timeDeltaMS = curTime.getTime() - this.lastTime.getTime();
      this.lastTime   = curTime;

      // Clear the canvas.
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      // Render the world.
      this.world.render(this.gl, timeDeltaMS);

      window.requestAnimationFrame(() => this.render());
    }
  }

  global.Renderer = Renderer;
})(window);

