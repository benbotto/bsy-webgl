(function(bsy) {
  'use strict';

  const fsSource = `
    uniform Material      uMaterial;
    uniform DistanceLight uDistLight;
    uniform sampler2D     uSampler;

    // Vertex normal converted to eye space.
    varying vec3 oNormalEC;

    // The vector from vertex to the light, converted to eye space.
    varying vec3 oVertToDistLight;

    // The vertex position, which will be moved to eye coords.
    varying vec3 oVertPosEC;

    // Texture coord from vertex shader.
    varying highp vec2 vTextureCoord;

    void main() {
      vec3 L, N, V;

      // The vertex normal.
      N = normalize(oNormalEC);

      // The vector from the vertex to the eye.
      V = normalize(-oVertPosEC);

      // Vertex to the light.
      L = normalize(oVertToDistLight);

      // Distance light intensity with texture.  The texture color mostly
      // replaces the material's diffuse part and partly replaces the
      // material's ambient part.
      Material holdMat = uMaterial;
      vec4     texClr  = texture2D(uSampler, vTextureCoord);
      holdMat.diffuse  = mix(uMaterial.diffuse, texClr, .85);
      holdMat.ambient  = mix(uMaterial.ambient, texClr, .25);
      gl_FragColor     = getIntensity(uDistLight, holdMat, L, N, V);
    }
  `;

  bsy.adsTextureFrag = fsSource;
})(window.bsy);

