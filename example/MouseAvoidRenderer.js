(function(bsy) {
  'use strict';

  /** Custom renderer for the mouse avoidance example. */
  class MouseAvoidRenderer extends bsy.IdentityWorldObjectRenderer {
    /**
     * Init.
     */
    constructor(gl, worldObj, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, worldObj, program, buffMgr);

      this.mousePosLoc   = gl.getUniformLocation(program, 'uMousePosition');
      this.mouseWorldPos = vec3.create();
    }

    /**
     * Set the mouse position (in world coordinates).
     */
    setMouseWorldPos(mouseWorldPos) {
      this.mouseWorldPos = mouseWorldPos;
    }

    /**
     * Render the worldObj.
     */
    render(gl, timeDeltaMS, trans) {
      this.useProgram();

      this.getContext().uniform3fv(this.mousePosLoc, this.mouseWorldPos);

      super.render(gl, timeDeltaMS, trans);
    }
  }

  bsy.MouseAvoidRenderer = MouseAvoidRenderer;
})(window.bsy);

