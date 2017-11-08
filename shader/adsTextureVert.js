(function(bsy) {
  'use strict';

  const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uNormalTrans;

    uniform DistanceLight uDistLight;

    // Vertex normal converted to eye space.
    varying vec3 oNormalEC;

    // The vector from vertex to the light, converted to eye space.
    varying vec3 oVertToDistLight;

    // The vertex position, which will be moved to eye coords.
    varying vec3 oVertPosEC;

    // Texture coord, passed to frag shader.
    varying highp vec2 vTextureCoord;

    void main() {
      mat4 modelView = uViewMatrix * uModelMatrix;

      // Convert the vertex position to eye space.
      vec4 vertPosEC = modelView * vec4(aVertexPosition, 1);

      // Pass the vertex position down the pipeline.
      oVertPosEC = vertPosEC.xyz;

      // With a distance light the vector from the vertex to the light
      // is always the same - the opposite of the distance light's direction -
      // and the distance light is very far away.
      vec4 distLightPosEC = uViewMatrix * vec4(-uDistLight.direction * 1000.0, 1);
      oVertToDistLight    = (distLightPosEC - vertPosEC).xyz;

      // Move the normal to eye space and pass it down.
      oNormalEC = (uNormalTrans * vec4(aVertexNormal, 0)).xyz;

      gl_Position   = uProjectionMatrix * vertPosEC;
      vTextureCoord = aTextureCoord;
    }
  `;

  bsy.adsVert = vsSource;
})(window.bsy);

