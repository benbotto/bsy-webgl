(function(bsy) {
  'use strict';

  /** Base class for all renderers (things that draw objects). */
  class Renderer {
    /**
     * Initialize the Renderer.
     */
    constructor(ctx, worldObj, program) {
      this.ctx        = ctx;
      this.worldObj   = worldObj;
      this.program    = program;
      this.renderers  = [];
      this.projection = mat4.create();
      this.view       = mat4.create();
    }

    /**
     * Do the rendering.
     */
    render(gl, timeDeltaMS, trans) {
      throw new Error('render() not implemented.');
    }

    /**
     * Write the projection matrix to the program.
     */
    writeProjection() {
      throw new Error('writeProjection() not implemented.');
    }

    /**
     * Write the view matrix to the program.
     */
    writeView() {
      throw new Error('writeView() not implemented.');
    }

    /**
     * Write the model matrix to the program.
     */
    writeModel() {
      throw new Error('writeModel() not implemented.');
    }

    /**
     * Get the WorldObject that this renderer renders.
     */
    getWorldObject() {
      return this.worldObj;
    }

    /**
     * Get the rendering context.
     */
    getContext() {
      return this.ctx;
    }

    /**
     * Get the shader program that this renderer should use.
     */
    getProgram() {
      return this.program;
    }

    /**
     * Use this renderer's program.
     */
    useProgram() {
      this.ctx.useProgram(this.getProgram());
    }

    /**
     * Add a renderer.  This renderer's view and projection matrices get
     * passed down to it.
     */
    addRenderer(renderer) {
      this.renderers.push(renderer);
      renderer.setProjection(this.projection);
      renderer.setView(this.view);
      
      return this;
    }

    /**
     * Get the renderers.
     */
    getRenderers() {
      return this.renderers;
    }

    /**
     * Set the projection matrix for this renderer and all child renderers.
     */
    setProjection(projection) {
      this.projection = projection;
      this.renderers.forEach(r => r.setProjection(projection));

      return this;
    }

    /**
     * Get the projection matrix.
     */
    getProjection() {
      return this.projection;
    }

    /**
     * Set the view matrix for this renderer and all child renderers.
     */
    setView(view) {
      this.view = view;
      this.renderers.forEach(r => r.setView(view));

      return this;
    }

    /**
     * Get the view matrix.
     */
    getView() {
      return this.view;
    }
  }

  bsy.Renderer = Renderer;
})(window.bsy);

