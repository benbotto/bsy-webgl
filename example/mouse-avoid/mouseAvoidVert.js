(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform vec3 uMousePosition;

    varying lowp vec4 color;

    void main() {
      // This is the model position in world space.
      vec4 modelPos = uModelMatrix * vec4(aVertexPosition, 1.0);

      // Figure out how far away the model position is from the mouse.
      float distFromMouse = distance(vec3(modelPos), uMousePosition);

      // The model is translated away from the mouse, inversely proportional
      // to the distance from the mouse.
      float transAmount = min(1.0 / distFromMouse, 1.0);

      // The vector from the mouse to the model is the direction that the
      // model should be translated.
      vec3 mouseToModel  = vec3(modelPos) - uMousePosition;

      // The translation vector (scaled mouseToModel vec).
      vec4 tlate = vec4(mouseToModel * transAmount, 0.0);

      // The new model position.
      modelPos += tlate;

      gl_Position = uProjectionMatrix * uViewMatrix * modelPos;
      color       = aVertexColor;
    }
  `;

  bsy.mouseAvoidVert = vsSource;
})(window.bsy);

