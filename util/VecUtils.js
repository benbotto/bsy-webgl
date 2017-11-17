(function(bsy) {
  'use strict';

  /** Vector helper functions. */
  class VecUtils {
    /**
     * Flatten an array of vec3.
     */
    static flattenVec3Array(vecs) {
      return vecs.reduce(
        (prev, cur) => prev.concat([cur[0], cur[1], cur[2]]),
        []);
    }

    /**
     * Inverse of the above.  Convert a flat array of vec3 to an array of vec3.
     */
    static toVec3Array(vecs) {
      const vec3s = [];

      for (let i = 0; i < vecs.length; i += 3)
        vec3s.push(vec3.fromValues(vecs[i], vecs[i+1], vecs[i+2]));

      return vec3s;
    }

    /**
     * Flatten an array of vec4.
     */
    static flattenVec4Array(vecs) {
      return vecs.reduce(
        (prev, cur) => prev.concat([cur[0], cur[1], cur[2], cur[3]]),
        []);
    }
  }

  bsy.VecUtils = VecUtils;
})(window.bsy);

