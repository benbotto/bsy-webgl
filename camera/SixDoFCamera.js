(function(bsy) {
  'use strict';

  /** A Camera with six degrees of freedom. */
  class SixDoFCamera extends bsy.Camera {
    /**
     * Initialize the location, U, V, and N vectors.  The Camera starts at
     * 0,0,0 looking in the negative Z direction.  The camera coordinate system
     * is left-handed, so the positive X is to the right in both camera and
     * world coordinates.
     */
    constructor() {
      super();

      this.U = vec3.fromValues(1, 0, 0);
      this.V = vec3.fromValues(0, 1, 0);
      this.N = vec3.fromValues(0, 0, -1);
    }

    /**
     * Update the view matrix.
     */
    _updateView() {
      // Look in front of the location.
      const normLook = vec3.normalize(vec3.create(), this.N);
      const look     = vec3.scaleAndAdd(
        vec3.create(),
        this.location,
        normLook,
        2.0);

      // Calculate the view matrix.
      this.setView(mat4.lookAt(mat4.create(), this.location, look, this.V));

      return this;
    }

    /**
     * Move forward.
     */
    moveForward(units) {
      // Normalize the lookat (N).
      const viewDir = vec3.normalize(vec3.create(), this.N);

      // Scale units in the viewDir direction and add it to the current
      // location.
      this.location = vec3.scaleAndAdd(
        vec3.create(),
        this.location,
        viewDir,
        units);

      this._updateView();

      return this;
    }

    /**
     * Move backward.
     */
    moveBackward(units) {
      return this.moveForward(-units);
    }

    /**
     * Strafe right.  Remember that the camera is in a left-handed coord
     * system.
     */
    strafeRight(units) {
      // Normalize the right (U).
      const xDir = vec3.normalize(vec3.create(), this.U);

      // Scale units in the U direction and add it to the current
      // location.
      this.location = vec3.scaleAndAdd(
        vec3.create(),
        this.location,
        xDir,
        units);

      this._updateView();

      return this;
    }

    /**
     * Strafe left.
     */
    strafeLeft(units) {
      return this.strafeRight(-units);
    }

    /**
     * Alias for strafeRight.
     */
    moveRight(units) {
      return this.strafeRight(units);
    }

    /**
     * Alias for strafeleft.
     */
    moveleft(units) {
      return this.strafeRight(-units);
    }

    /**
     * Move up.
     */
    moveUp(units) {
      // Normalize the up (V).
      const yDir = vec3.normalize(vec3.create(), this.V);

      // Scale units in the U direction and add it to the current
      // location.
      this.location = vec3.scaleAndAdd(
        vec3.create(),
        this.location,
        yDir,
        units);

      this._updateView();

      return this;
    }

    /**
     * Move down.
     */
    moveDown(units) {
      return this.moveUp(-units);
    }

    /**
     * Pitch the camera.
     */
    pitch(units) {
      // Rotate the up (V) and look (N) about the right (U) axis.
      const rot = quat.setAxisAngle(quat.create(), this.U, units);

      vec3.transformQuat(this.V, this.V, rot);
      vec3.transformQuat(this.N, this.N, rot);

      this._updateView();

      return this;
    }

    /**
     * Pitch the camera up.
     */
    pitchUp(units) {
      return this.pitch(units);
    }

    /**
     * Pitch the camera down.
     */
    pitchDown(units) {
      return this.pitch(-units);
    }

    /**
     * Yaw the camera.
     */
    yaw(units) {
      // Rotate right (U) and look (N) about the up (V) axis.
      const rot = quat.setAxisAngle(quat.create(), this.V, units);

      vec3.transformQuat(this.U, this.U, rot);
      vec3.transformQuat(this.N, this.N, rot);

      this._updateView();

      return this;
    }

    /**
     * Yaw the camera left.
     */
    yawLeft(units) {
      return this.yaw(units);
    }

    /**
     * Yaw the camera right.
     */
    yawRight(units) {
      return this.yaw(-units);
    }
  }

  bsy.SixDoFCamera = SixDoFCamera;
})(window.bsy);

