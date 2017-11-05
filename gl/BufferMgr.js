(function(bsy) {
  'use strict';

  class BufferMgr {
    /**
     * Create and fill a buffer.
     */
    fillNewBuffer(gl, data) {
      const buffer = gl.createBuffer();

      // The buffer will be used for vertex data, like coordinates, colors or
      // texture coordinates.
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      // Fill the buffer.
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

      return buffer;
    }
  }

  bsy.BufferMgr = BufferMgr;
})(window.bsy);

