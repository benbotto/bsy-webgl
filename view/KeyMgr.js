(function(bsy) {
  'use strict';

  /** Manages key state. */
  class KeyMgr {
    /**
     * Init.
     */
    constructor() {
      this._keyState = new Set();

      window.onkeydown = e => {
        if (!this.isKeyDown(e.code))
          this._keyState.add(e.code);
      };

      window.onkeyup = e => this._keyState.delete(e.code);
    }

    /**
     * Check if a key is down.
     */
    isKeyDown(code) {
      return this._keyState.has(code);
    }
  }

  bsy.KeyMgr = KeyMgr;
})(window.bsy);

