(function(bsy) {
  'use strict';

  bsy.MaterialH = `
    precision mediump float;

    struct Material
    {
      vec4  ambient;
      vec4  diffuse;
      vec4  specular;
      float shininess;
    };
  `;
})(window.bsy);

