(function(bsy) {
  'use strict';

  const fsSource = `
    uniform Material      uMaterial;
    uniform DistanceLight uDistLight;

    // Vertex normal converted to eye space.
    varying vec3 oNormalEC;

    // The vector from vertex to the light, converted to eye space.
    varying vec3 oVertToDistLight;

    // The vertex position, which will be moved to eye coords.
    varying vec3 oVertPosEC;

    void main() {
      vec3 L, N, V;

      // The vertex normal.
      N = normalize(oNormalEC);

      // The vector from the vertex to the eye.
      V = normalize(-oVertPosEC);

      // Vertex to the light.
      L = normalize(oVertToDistLight);

      // Distance light intensity.
      gl_FragColor = getIntensity(uDistLight, uMaterial, L, N, V);
    }
  `;

  bsy.adsFrag = fsSource;
})(window.bsy);

