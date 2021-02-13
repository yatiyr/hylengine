/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-var */


import {mat4, glMatrix, vec3} from 'gl-matrix';


// For now we allow only perspective projection
export class Camera {

    viewMatrix : mat4;
    projectionMatrix : mat4;

    vp : mat4;

    cameraPosition : vec3;
    cameraTarget   : vec3;
    upVector       : vec3;
    fov            : number;
    aspectRatio    : number;
    near           : number;
    far            : number;


    constructor(cameraPosition, cameraTarget, upVector, fov, aspectRatio, near, far) {

        this.cameraPosition = cameraPosition;
        this.cameraTarget   = cameraTarget;
        this.upVector       = upVector;
        this.fov            = fov;
        this.aspectRatio    = aspectRatio;
        this.near           = near;
        this.far            = far;

        var resView = mat4.create();
        var resProjection = mat4.create();
        var resMv = mat4.create();

        this.viewMatrix = mat4.lookAt(resView, cameraPosition, cameraTarget, upVector);
        this.projectionMatrix = mat4.perspective(resProjection, glMatrix.toRadian(fov), aspectRatio, near, far);
        this.vp = mat4.mul(resMv, this.viewMatrix, this.projectionMatrix);
        
    }

    // TODO: FONKSIYON EKLE
    setAspectRatio(aspectRatio) {
        this.aspectRatio = aspectRatio;
        mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fov), this.aspectRatio,
                         this.near, this.far);
        mat4.mul(this.vp, this.viewMatrix, this.projectionMatrix);
    }

    setFov(fov) {
        this.fov = fov;
        mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fov), this.aspectRatio,
                         this.near, this.far);
        mat4.mul(this.vp, this.viewMatrix, this.projectionMatrix);        
    }

    setNear(near) {
        this.near = near;
        mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fov), this.aspectRatio,
                         this.near, this.far);
        mat4.mul(this.vp, this.viewMatrix, this.projectionMatrix);         
    }

    setFar(far) {
        this.far = far;
        mat4.perspective(this.projectionMatrix, glMatrix.toRadian(this.fov), this.aspectRatio,
                         this.near, this.far);
        mat4.mul(this.vp, this.viewMatrix, this.projectionMatrix);          
    }

    translateCamera(x,y,z) {

        var translateMat;
        mat4.fromTranslation(translateMat, [x, y, z]);
        mat4.invert(translateMat, translateMat);

        mat4.mul(this.viewMatrix, this.viewMatrix, translateMat);
        mat4.mul(this.vp, this.projectionMatrix, this.viewMatrix);
        
    }

    // ROTATIONS MAY OR MAY NOT BE ADDED!
}