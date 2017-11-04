(function(bsy) {
  'use strict';

  /** Base class for drawable world objects. */
  class WorldObject {
    /**
     * Initialize the WorldObject.
     */
    constructor(gl) {
      this.vertBuffer = this.fillVertexBuffer(gl);
    }

    /**
     * Get the vertices.
     */
    getVertices() {
      throw new Error('getVertices() not implemented.');
    }

    /**
     * Get the program.
     */
    getProgram() {
      throw new Error('getProgram() not implemented.');
    }

    /**
     * Fill a new buffer with this object's vertices.
     */
    fillVertexBuffer(gl) {
      this.getBufferMgr().fillNewBuffer(gl, this.getVertices());
    }

    /**
     * Get this object's vertex buffer.
     */
    getVertexBuffer() {
      return this.vertBuffer;
    }

    /**
     * Get the BufferMgr instance.
     */
    getBufferMgr() {
      return new bsy.BufferMgr();
    }

    /**
     * Draw the WorldObject.
     */
    render(gl, elapsed, mat) {
      throw new Error('render() not implemented.');
    }
  }

  bsy.WorldObject = WorldObject;
})(window.bsy);

