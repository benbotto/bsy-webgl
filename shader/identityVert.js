(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 color;

    void main() {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
      color       = aVertexColor;
    }
  `;

  bsy.identityVert = vsSource;
})(window.bsy);

