(function(bsy) {
  'use strict';

  class TextureMgr {
    /**
     * Load an image from a URL.  Returns a promise that is resolved with the
     * Image instance, or rejected with an error.
     */
    loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload  = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image from ${url}.`));
        img.src     = url;
      });
    }

    /**
     * Load a texture using an Image instance.
     */
    loadTexture(gl, img) {
      const texture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      if (this.isPowerOf2(img))
        gl.generateMipmap(gl.TEXTURE_2D);
      else {
        // Not a power of 2. Turn off mips and set wrapping to clamp to edge.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

      return texture;
    }

    /**
     * Check if an image has power-of-2 dimensions.
     */
    isPowerOf2(img) {
      return (img.width  & (img.width  - 1)) === 0  &&
             (img.height & (img.height - 1)) === 0;
    }
  }

  bsy.TextureMgr = TextureMgr;
})(window.bsy);

