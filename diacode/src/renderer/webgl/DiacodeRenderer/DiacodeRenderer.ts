/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Canvas} from "./Canvas";
import {ShaderProgram} from "./ShaderPrograms/ShaderProgram";

import {World} from './World';

// This import is likely to change
// Drawable Objects may completely take over shader objects

import { SimpleShaderProgram } from "./ShaderPrograms/SimpleShaderProgram";
import { ThreeDObjectShaderProgram } from "./ShaderPrograms/ThreeDObjectShaderProgram";
import { Rectangle } from "./Object/Rectangle";
import { Rectangle3D } from "./Object/Rectangle3D";


export class DiacodeRenderer {

    canvas : Canvas;

    // Shader Program number may increase in time
    // Simple Shader
    // Maybe multiple shader programs will be recorded
    // inside a hash table ? ( I dunno )
    simpleShaderProgram : ShaderProgram;


    fps : number;

    // Not implemented yet
    world : World;

    constructor() {
        this.canvas = new Canvas();
        this.canvas.initializeCanvas();

        this.simpleShaderProgram = new ThreeDObjectShaderProgram(this.canvas.gl);
        
        this.fps = 144;

        // TODO: Work on Progress
        this.world = new World();

        var rec3D = new Rectangle3D(100,100, 1, 0.5, 0.5, 220, [0,0,0]);

        this.addPrimitive(rec3D);

    }

    addPrimitive(primitive) {
        primitive.bindToRenderer(this.canvas.gl, this.simpleShaderProgram);
        this.world.addPrimitive(primitive);
    }

    render() {

        this.canvas.resizeCanvasToDisplaySize();
        const [displayWidth, displayHeight] = this.canvas.canvasToDisplaySizeMap.get(this.canvas.canvas);

        this.canvas.gl.viewport(0, 0, displayWidth, displayHeight);
        this.canvas.gl.clearColor(1, 1, 1, 1);
        this.canvas.gl.clear(this.canvas.gl.COLOR_BUFFER_BIT | this.canvas.gl.DEPTH_BUFFER_BIT);
        
        this.canvas.gl.enable(this.canvas.gl.DEPTH_TEST);
        //this.canvas.gl.enable(this.canvas.gl.CULL_FACE);


        this.world.draw();

        setTimeout(() => {
            requestAnimationFrame(this.render.bind(this));            
        }, 1000/this.fps)
        //requestAnimationFrame(this.drawScene.bind(this));        
    }

        /*
    addObject() {

    }

    changeCamera() {

    }

    translateCamera() {

    }

    */


}