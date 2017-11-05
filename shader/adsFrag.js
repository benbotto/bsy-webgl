(function(bsy) {
  'use strict';

  const fsSource = `
    uniform Material      uMaterial;
    uniform DistanceLight uDistLight;

    void main() {
      gl_FragColor = uMaterial.ambient * uDistLight.ambient;
    }
  `;

  bsy.adsFrag = fsSource;
})(window.bsy);

