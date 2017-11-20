(function(bsy) {
  'use strict';

  /** An object that emitts particles. */
  class ParticleEmitter {
    /**
     * Initialze with some number of particles.
     */
    constructor(numParticles) {
      this.numParticles  = numParticles;
      this.particles     = [];
      this.vertices      = [];
      this.vertexNormals = [];
      this.indices       = [];
      this.textureCoords = [];

      this.createParticles();
    }

    /**
     * Protected helper function to create the array of particles.  By default
     * each particle is a square.
     */
    createParticles() {
      for (let i = 0; i < this.numParticles; ++i) {
        const square = new bsy.Square();

        this.particles.push(square);
        this.vertices.push(...square.getVertices());
        this.textureCoords.push(...square.getTextureCoords());
      }

      this.indices = this.particles
        .reduce((prev, cur) => {
          return prev
            .concat(cur
              .getVertexIndices()
                .map(i => i + prev.length));
        }, []);
      window.console.log(this.indices);
        /*.map((particle, i) => {
          const indices = particle.getVertexIndices();

          return indices.map(ind => ind + i * indices.length)
        });*/
    }
  }

  bsy.ParticleEmitter = ParticleEmitter;
})(window.bsy);

