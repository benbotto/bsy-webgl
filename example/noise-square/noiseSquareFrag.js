(function(bsy) {
  'use strict';

  const fsSource = `
    varying lowp vec4 oColor;
    varying lowp vec3 oVertexPosition;

    uniform mediump float uTicker;

    /**
     * Creates turbulence for noise.  Taken from Dr. Clevenger's 
     * CSC155 notes (CSUS).
     * @param vert The vertex to use for turbulence.
     * @param numOctaves The number of octives.
     */
    float turbulence(vec3 vert) {
      float sum = 0.0;

      for (int octave = 0; octave < 10; ++octave) {
        float scale = pow(2.0, float(octave));

        sum += abs(1.0 / scale * snoise(scale * vert));
      }

      return sum;
    }

    void main() {
      gl_FragColor = oColor + turbulence(oVertexPosition + uTicker);
    }
  `;

  bsy.noiseSquareFrag = fsSource;
})(window.bsy);

