(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 oColor;
    varying lowp vec3 oVertexPosition;

    void main() {
      gl_Position     = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
      oColor          = aVertexColor;
      oVertexPosition = aVertexPosition;
    }
  `;

  bsy.noiseSquareVert = vsSource;
})(window.bsy);

