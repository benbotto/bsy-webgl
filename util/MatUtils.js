(function(bsy) {
  'use strict';

  /** Matrix helper functions. */
  class MatUtils {
    /**
     * Convert mouse coordinates to world coordinates at some passed-in depth
     * (z).
     * @param {Renderer} renderer - A Renderer instance with getContext(),
     * getView(), and getProjection() implementations.
     * @param {Int} clientX - The x position of the mouse.
     * @param {Int} clientY - The y position of the mouse.
     * @param {Number} z - The z position in world coordinates.  This is the
     * depth at which the world coordinates will be found.
     */
    static mouseCoordsToWorldCoordsAtDepth(renderer, clientX, clientY, z) {
      const gl       = renderer.getContext();
      const viewMat  = renderer.getView();
      const projMat  = renderer.getProjection();
      const viewProj = mat4.multiply(mat4.create(), projMat, viewMat);

      // The clipspace position will always be between -1 and 1.
      const clipPos = vec3.fromValues(
        clientX / gl.canvas.clientWidth  *  2 - 1,
        clientY / gl.canvas.clientHeight * -2 + 1,
        0);
      
      // When a pixel is sent down the pipeline it's multiplied by the view and
      // projection matrices.  Using these matrices the post-projection z
      // values is determined (x and y are ignored here, as they're already
      // computed above).
      clipPos[2] = vec3.transformMat4(vec3.create(), [0, 0, z], viewProj)[2];

      // Finally, invert the projection * view to find where the mouse is in
      // world coordinates.
      // To convert from clip space to world space, the clip space position is
      // multiplied by the inverse of projection * view.
      return vec3.transformMat4(vec3.create(), clipPos,
        mat4.invert(mat4.create(), viewProj));
    }
  }

  bsy.MatUtils = MatUtils;
})(window.bsy);

