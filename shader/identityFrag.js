(function(bsy) {
  'use strict';

  const fsSource = `
    varying lowp vec4 color;

    void main() {
      gl_FragColor = color;
    }
  `;

  bsy.identityFrag = fsSource;
})(window.bsy);

