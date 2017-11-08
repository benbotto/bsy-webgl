(function(bsy) {
  'use strict';

  const fsSource = `
    uniform sampler2D uSampler;

    varying highp vec2 vTextureCoord;

    void main() {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  bsy.identityTextureFrag = fsSource;
})(window.bsy);

