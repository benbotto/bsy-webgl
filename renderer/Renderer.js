(function(bsy) {
  'use strict';

  /** Base class for all renderers (things that draw objects). */
  class Renderer {
    /**
     * Initialize the Renderer.
     */
    constructor(gl, worldObj, program) {
      this.gl         = gl;
      this.worldObj   = worldObj;
      this.program    = program;
      this.renderers  = [];
      this.projection = mat4.create();
      this.view       = mat4.create();
      this.model      = mat4.create();
    }

    /**
     * Do the rendering.  By default this just renders all sub renderers.
     * Generally a renderer should override this method.
     */
    render(gl, timeDeltaMS, trans) { // jshint ignore:line
      const lTrans = mat4.multiply(mat4.create(), trans, this.getWorldObject().getTransform());

      this.getRenderers().forEach(r => r.render(gl, timeDeltaMS, lTrans));
    }

    /**
     * Get the projection location attribute.
     */
    getProjectionLoc() {
      throw new Error('getProjectionLoc() not implemented.');
    }

    /**
     * Get the view location attribute.
     */
    getViewLoc() {
      throw new Error('getViewLoc() not implemented.');
    }

    /**
     * Get the model location attribute.
     */
    getModelLoc() {
      throw new Error('getModelLoc() not implemented.');
    }

    /**
     * Write the projection matrix to the program.
     */
    writeProjection() {
      this.getContext().uniformMatrix4fv(this.getProjectionLoc(), false, this.getProjection());
    }

    /**
     * Write the view matrix to the program.
     */
    writeView() {
      this.getContext().uniformMatrix4fv(this.getViewLoc(), false, this.getView());
    }

    /**
     * Write the model matrix to the program.
     */
    writeModel() {
      this.getContext().uniformMatrix4fv(this.getModelLoc(), false, this.getModel());
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
      return this.gl;
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
      this.getContext().useProgram(this.getProgram());
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

    /**
     * Set the model matrix for this renderer.  Unlike view and projection,
     * this does not set the model matrix for children.
     */
    setModel(model) {
      this.model = model;
      return this;
    }

    /**
     * Get the model matrix.
     */
    getModel() {
      return this.model;
    }
  }

  bsy.Renderer = Renderer;
})(window.bsy);

