(function(bsy) {
  'use strict';

  const vsSource = `
    precision mediump float;

    attribute vec3  aVertexPosition;
    attribute vec4  aVertexColor;
    attribute vec3  aVelocity;
    attribute float aLifetime;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    // Elapsed in seconds.
    uniform float uElapsed;

    varying lowp vec4 color;

    void main() {
      // The elapsed time cycles between 0 and lifetime.
      float elapsedCycle = mod(uElapsed, aLifetime);

      // Remaining life of the particle.
      //float remLife = max(aLifetime - uElapsed, 0.0);
      float remLife = aLifetime - elapsedCycle;

      // This is the model position in world space.
      vec4 modelPos = uModelMatrix * vec4(aVertexPosition, 1.0);

      // Translate the model using the velocity vector.
      modelPos += vec4(aVelocity, 0.0) * elapsedCycle;

      // Black hole.
      //modelPos += vec4(aVelocity, 0.0) * remLife;

      gl_Position = uProjectionMatrix * uViewMatrix * modelPos;
      color       = vec4(vec3(aVertexColor), remLife / aLifetime);
    }
  `;

  bsy.particleEmitterVert = vsSource;
})(window.bsy);

