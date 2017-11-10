(function(bsy) {
  'use strict';

  /** Manages the mouse. */
  class MouseMgr {
    /**
     * Init.
     */
    constructor(canvas) {
      this.canvas            = canvas;
      this.enablePointerLock = true;
      this._pointerLocked    = false;
      this.onmousemove       = function() {};

      window.document.onpointerlockchange = e => this._onpointerlockchange(e);

      this.canvas.onclick = () => this._lockPointer();
      this.canvas.onmousemove = e => this._onmousemove(e);
    }

    /**
     * Lock the pointer if possible.
     */
    _lockPointer() {
      if (this.enablePointerLock)
        this.canvas.requestPointerLock();
    }

    /**
     * Check if the pointer is locked.
     */
    isPointerLocked() {
      return this._pointerLocked;
    }

    /**
     * On mouse move.
     */
    _onmousemove(e) {
      this.onmousemove({
        pointerLocked: this.isPointerLocked(),
        clientX      : e.clientX,
        clientY      : e.clientY,
        movementX    : e.movementX,
        movementY    : e.movementY
      });
    }

    /**
     * When the pointer lock status changes.
     */
    _onpointerlockchange() {
      this._pointerLocked = window.document.pointerLockElement === this.canvas;
    }
  }

  bsy.MouseMgr = MouseMgr;
})(window.bsy);

