(function(bsy) {
  'use strict';

  class BufferMgr {
    /**
     * Create and fill a float buffer.
     */
    fillNewFloatArrayBuffer(gl, data) {
      const buffer = gl.createBuffer();

      // The buffer will be used for vertex data, like coordinates, colors or
      // texture coordinates.
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      // Fill the buffer.
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

      return buffer;
    }

    /**
     * Create and fill an int ElementArray buffer.
     */
    fillNewIntElementArrayBuffer(gl, data) {
      const buffer = gl.createBuffer();

      // The buffer will be used for array indices.
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

      // Fill the buffer.
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);

      return buffer;
    }
  }

  bsy.BufferMgr = BufferMgr;
})(window.bsy);

