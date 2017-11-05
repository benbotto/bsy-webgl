(function(bsy) {
  'use strict';

  /**
   * This class deals with the canvas and such (i.e. the easel is what the user
   * draws on.
   */
  class Easel {
    /**
     * Initialize.
     */
    constructor(width, height) {
      this.canvas        = window.document.createElement('canvas');
      this.canvas.width  = width  || window.innerWidth;
      this.canvas.height = height || window.innerHeight;
      this.gl            = this.canvas.getContext('webgl');
      this.onDraw        = function () {};
      this.startTime     = null;
      this.lastTime      = null;
      
      window.document.body.appendChild(this.canvas);
    }

    /**
     * Get the webgl context.
     */
    getContext() {
      return this.gl;
    }

    /**
     * Start drawing.
     */
    start() {
      const self     = this;

      this.startTime = new Date();
      this.lastTime  = new Date();

      window.requestAnimationFrame(doDraw);

      function doDraw() {
        // Time delta is needed on each render so that object can be moved
        // correctly despite the speed of the device.
        let curTime     = new Date();
        let timeDeltaMS = curTime.getTime() - self.lastTime.getTime();
        self.lastTime   = curTime;

        self.onDraw(self.gl, timeDeltaMS);

        window.requestAnimationFrame(doDraw);
      }
    }
  }

  bsy.Easel = Easel;
})(window.bsy);

