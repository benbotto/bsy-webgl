(function(bsy) {
  'use strict';

  /** Renderer for a particle emitter. */
  class ParticleEmitterRenderer extends bsy.IdentityWorldObjectRenderer {
    /**
     * Init.
     */
    constructor(gl, emitter, program, buffMgr = new bsy.BufferMgr()) {
      super(gl, emitter, program, buffMgr);

      this.startTime      = null;
      this.velocityBuffer = buffMgr.fillNewFloatArrayBuffer(gl, emitter.getVelocities());
      this.lifetimeBuffer = buffMgr.fillNewFloatArrayBuffer(gl, emitter.getLifetimes());
      this.velocityLoc    = gl.getAttribLocation(program,  'aVelocity');
      this.lifetimeLoc    = gl.getAttribLocation(program,  'aLifetime');
      this.elapsedLoc     = gl.getUniformLocation(program, 'uElapsed');
    }

    /**
     * Render the emitter.
     */
    render(gl, timeDeltaMS, trans) {
      this.useProgram();

      // Enable blending so that the particles are transparent.
      gl.depthFunc(gl.ALWAYS);
      //gl.depthFunc(gl.NOTEQUAL);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);

      // Velocities.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.velocityBuffer);
      gl.vertexAttribPointer(this.velocityLoc, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.velocityLoc);

      // Total elapsed time.
      if (!this.startTime)
        this.startTime = new Date();

      const time    = new Date();
      const elapsed = (time.getTime() - this.startTime.getTime()) / 1000;

      gl.uniform1f(this.elapsedLoc, elapsed);

      // Particle lifetime.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.lifetimeBuffer);
      gl.vertexAttribPointer(this.lifetimeLoc, 1, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.lifetimeLoc);

      super.render(gl, timeDeltaMS, trans);

      // Cleanup.
      gl.disableVertexAttribArray(this.velocityLoc);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ZERO);
    }
  }

  bsy.ParticleEmitterRenderer = ParticleEmitterRenderer;
})(window.bsy);

