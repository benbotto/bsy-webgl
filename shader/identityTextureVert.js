(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main() {
      gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
      vTextureCoord = aTextureCoord;
    }
  `;

  bsy.identityTextureVert = vsSource;
})(window.bsy);

