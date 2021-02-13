/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import {Camera} from './Camera/Camera';

// TODO: WORK ON PROGRESS
export class World {

    camera: Camera | null;

    objects: any[];
    primitives : any[];

    constructor() {
        this.camera  = null;
        this.objects = [];
        this.primitives = [];
    }

    draw() {

        for(var primitive of this.primitives) {
            primitive.draw();
        }

        for(var object of this.objects) {
            object.draw();
        }
    }

    addPrimitive(primitive) {
        this.primitives.push(primitive);
    }

    bindCamera(camera) {
        this.camera = camera;
    }

    translateCamera(x,y,z) {
        this.camera?.translateCamera(x, y, z);
    }

    setAspectRatio(aspectRatio) {
        this.camera?.setAspectRatio(aspectRatio);
    }
    
    setFov(fov) {
       this.camera?.setFov(fov);
    }
    
    setNear(near) {
        this.camera?.setNear(near);
    }
    
    setFar(far) {
        this.camera?.setFar(far);
    }
    
}