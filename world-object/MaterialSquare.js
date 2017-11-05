(function(bsy) {
  'use strict';

  /** A materialed square. */
  class MaterialSquare extends bsy.Square {
    /**
     * Initialize the square.
     */
    constructor(material) {
      super();

      this.material      = material;
      this.vertexNormals = Array
        .from({length: 6}, () => [0.0, 0.0, 1.0])
        .reduce((prev, cur) => prev.concat(cur));
    }

    /**
     * Set the material.
     */
    setMaterial(material) {
      this.material = material;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return this.material;
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      return this.vertexNormals;
    }
  }

  bsy.MaterialSquare = MaterialSquare;
})(window.bsy);

