(function(bsy) {
  'use strict';

  /** Base class for objects that are renderable. */
  class WorldObject {
    /**
     * Initialize the world object.
     */
    constructor() {
      this.worldObjects = new Map();
      this.transform    = mat4.create();
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      throw new Error('getVertices() not implemented.');
    }

    /**
     * Get the vertex indices.
     */
    getVertexIndices() {
      throw new Error('getVertexIndices() not implemented.');
    }

    /**
     * Get the normals.
     */
    getVertexNormals() {
      throw new Error('getVertexNormals() not implemented.');
    }

    /**
     * Get the vertex colors.
     */
    getVertexColors() {
      return null;
    }

    /**
     * Get the material.
     */
    getMaterial() {
      return null;
    }

    /**
     * Get the texture coordinates.
     */
    getTextureCoords() {
      return null;
    }

    /**
     * Get the texture image.
     */
    getTextureImage() {
      throw new Error('getTextureImage() not implemented.');
    }

    /**
     * Add a world object.
     */
    addWorldObject(name, wo) {
      if (this.worldObjects.has(name))
        throw new Error(`World object ${name} already exists.`);

      this.worldObjects.set(name, wo);
      return this;
    }

    /**
     * Get a world object by name.
     */
    getWorldObject(name) {
      return this.worldObjects.get(name);
    }

    /**
     * Iterate over the world objects.
     */
    *[Symbol.iterator]() {
      for (let wo of this.worldObjects.values())
        yield wo;
    }

    /**
     * Get this object's transformation matrix.
     */
    getTransform() {
      return this.transform;
    }

    /**
     * 1et this object's transformation matrix.
     */
    setTransform(transform) {
      this.transform = transform;
      return this;
    }

    /**
     * Helper method to dedupe vertices and reindex accordingly.
     */
    dedupeVertices() {
      const verts       = bsy.VecUtils.toVec3Array(this.getVertices());
      const inds        = this.getVertexIndices();
      const uniqueVerts = [];

      verts.forEach((v1, vertInd) => {
        // Check if the vertex exists in the array of unique vertices.
        const uniqueInd = uniqueVerts.findIndex(v2 => vec3.equals(v1, v2));

        if (uniqueInd === -1) {
          // New vertex encountered.  Add it to the unique list of verts.
          uniqueVerts.push(v1);

          // Any index that previously pointed at this vertex needs to be
          // updated to point at the new index in the unique array.
          inds.forEach((ind, i, inds) => {
            if (ind === vertInd)
              inds[i] = uniqueVerts.length - 1;
          });
        }
        else {
          // Vertex found in the unique array.  Point any indices that point at
          // the duplicate so that the point at the unique index.
          inds.forEach((ind, i, inds) => {
            if (ind === vertInd)
              inds[i] = uniqueInd;
          });
        }
      });

      this.getVertices().splice(0);
      this.getVertices().push(...bsy.VecUtils.flattenVec3Array(uniqueVerts));
    }

    /**
     * Compute the vertex normals for this object.
     * Important: The vertices must not contain duplicates or this method will
     * not work.
     */
    computeVertexNormals() {
      const verts = bsy.VecUtils.toVec3Array(this.getVertices());
      const inds  = this.getVertexIndices();

      // A map wherein each key is a vertex, and the value is a normal.
      const vertLookup = new Map();
      verts.forEach(v => vertLookup.set(v, vec3.create()));

      // Create a triangle for each set of three indices.  Each triangle has a 
      // face normal that contributes to each vertex's normal.
      for (let i = 0; i < inds.length; i += 3) {
        const points   = [verts[inds[i]], verts[inds[i+1]], verts[inds[i+2]]];
        const triangle = new bsy.Triangle(...points);
        const faceNorm = triangle.getFaceNormal();

        points
          .forEach(v => { // jshint ignore:line
            const vecNorm = vertLookup.get(v);
            vec3.normalize(vecNorm, vec3.add(vec3.create(), faceNorm, vecNorm));
          });
      }

      return bsy.VecUtils.flattenVec3Array([...vertLookup.values()]);
    }
  }

  bsy.WorldObject = WorldObject;
})(window.bsy);

