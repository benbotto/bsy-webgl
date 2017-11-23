(function(bsy) {
  'use strict';

  /** Renderer for the noise square example. */
  class NoiseSquareRenderer extends bsy.IdentityWorldObjectRenderer {
    /**
     * Init.
     */
    constructor(gl, worldObj, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, worldObj, program, buffMgr);

      this.ticker    = 0;
      this.tickerLoc = gl.getUniformLocation(program, 'uTicker');
    }

    /**
     * Render the worldObj.
     */
    render(gl, timeDeltaMS, trans) {
      this.useProgram();

      this.ticker += .01 * timeDeltaMS / 1000;

      gl.uniform1f(this.tickerLoc, this.ticker);

      super.render(gl, timeDeltaMS, trans);
    }
  }

  bsy.NoiseSquareRenderer = NoiseSquareRenderer;
})(window.bsy);

