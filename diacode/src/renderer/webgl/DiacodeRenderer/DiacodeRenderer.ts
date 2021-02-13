/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Canvas} from "./Canvas";
import {ShaderProgram} from "./ShaderPrograms/ShaderProgram";

import {World} from './World';

// This import is likely to change
// Drawable Objects may completely take over shader objects

import { SimpleShaderProgram } from "./ShaderPrograms/SimpleShaderProgram";
import { Rectangle } from "./Object/Rectangle";



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

        this.simpleShaderProgram = new SimpleShaderProgram(this.canvas.gl);
        
        this.fps = 144;

        // TODO: Work on Progress
        this.world = new World();

        var rect1 = new Rectangle(100,200,30,60,[0,0,1,1]);
        var rect2 = new Rectangle(10,200,70,60,[1,0,1,1]);
        var rect3 = new Rectangle(300,200,90,60,[1,0,0,1]);
        var rect4 = new Rectangle(500,100,100,60,[0,1,0,1]);

        var emreninDikdortgeni = new Rectangle(500, 100, 200, 100, [0.203, 0.917, 0.738, 1]);

        this.addPrimitive(rect1);
        this.addPrimitive(rect2);
        this.addPrimitive(rect3);
        this.addPrimitive(rect4);
        this.addPrimitive(emreninDikdortgeni);

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