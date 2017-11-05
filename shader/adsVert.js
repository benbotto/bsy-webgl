(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    uniform DistanceLight uDistLight;

    void main() {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    }
  `;

  bsy.adsVert = vsSource;
})(window.bsy);

