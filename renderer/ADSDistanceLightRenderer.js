(function(bsy) {
  'use strict';

  /**
   * Renderer for a DistanceLight using the ADS program.
   */
  class ADSDistanceLightRenderer extends bsy.Renderer {
    /**
     * Initialize the renderer.
     */
    constructor(gl, light, program) {
      super(gl, light, program);

      this.ambientLoc   = gl.getUniformLocation(program, 'uDistLight.ambient');
      this.diffuseLoc   = gl.getUniformLocation(program, 'uDistLight.diffuse');
      this.specularLoc  = gl.getUniformLocation(program, 'uDistLight.specular');
      this.directionLoc = gl.getUniformLocation(program, 'uDistLight.direction');
    }

    /**
     * Render the light.
     */
    render(gl, timeDeltaMS) {
      const light = this.getWorldObject();

      this.useProgram();

      // Write the light.
      this.getContext().uniform4fv(this.ambientLoc,   light.getAmbient());
      this.getContext().uniform4fv(this.diffuseLoc,   light.getDiffuse());
      this.getContext().uniform4fv(this.specularLoc,  light.getSpecular());
      this.getContext().uniform3fv(this.directionLoc, light.getDirection());
    }
  }

  bsy.ADSDistanceLightRenderer = ADSDistanceLightRenderer;
})(window.bsy)

