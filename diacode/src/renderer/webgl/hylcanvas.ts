/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { RectangleFactory } from './object/rectangle/rectangleFactory';

export class HylCanvas {

    canvasToDisplaySizeMap : any;
    resizeObserver         : any;
    canvas                 : any;
    gl                     : any;

    objects : any[];

    rectangleFactory : any;

    rectangles : any[];


    fps: any;

    constructor() {
        this.canvasToDisplaySizeMap = "";
        this.resizeObserver         = "";
        this.canvas                 = "";
        this.gl                     = "";
        this.objects                = [];

        this.rectangleFactory       = "";
        this.rectangles = [];

        this.fps = 60;
    }


    drawScene() {
        this.resizeCanvasToDisplaySize(this.canvas);
        const [displayWidth, displayHeight] = this.canvasToDisplaySizeMap.get(this.canvas);

        this.gl.viewport(0, 0, displayWidth, displayHeight);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        for(var rect of this.rectangles) {
            rect.draw();
        }

        setTimeout(() => {
            requestAnimationFrame(this.drawScene.bind(this));            
        }, 1000/this.fps)
        //requestAnimationFrame(this.drawScene.bind(this));

    }

    

    resizeCanvasToDisplaySize(canvas) {

        const [displayWidth, displayHeight] = this.canvasToDisplaySizeMap.get(canvas);

        const needResize = canvas.width  != displayWidth ||
                           canvas.height != displayHeight;


            canvas.width  = displayWidth;
            canvas.height = displayHeight;


        return needResize;
    }

    initializeCanvas() {

        this.canvas = <HTMLCanvasElement> document.querySelector("#glCanvas");
        this.gl = this.canvas.getContext("webgl2");
        
        if(this.gl == null) {
            alert("Unable to initialize canvas, webgl2 is not supported");
            return;
        }

        this.rectangleFactory = new RectangleFactory(this.gl);

        this.startObservingSizeChange();           
        this.canvasToDisplaySizeMap = new Map([[this.canvas, [this.canvas.width, this.canvas.height]]]);
        var rect1 = this.rectangleFactory.createRectangle(10,10,10,10,
                                                          [1, 0, 0, 1]);
        var rect2 = this.rectangleFactory.createRectangle(50, 50, 10, 10,
                                                          [1, 1, 0, 1]);
        this.rectangles.push(rect1,rect2);
        
    }

    startObservingSizeChange() {
        this.resizeObserver = new ResizeObserver(this.onResize.bind(this))
        try {
            this.resizeObserver.observe(this.canvas, {box: 'device-pixel-content-box'});
        }
        catch (ex) {
            this.resizeObserver.observe(this.canvas, {box: 'content-box'});
        }
    }

    onResize(entries) {
        for(const entry of entries) {
            let width;
            let height;
            let dpr = window.devicePixelRatio;
            if(entry.devicePixelContentBoxSize) {
                width  = entry.devicePixelContentBoxSize[0].inlineSize;
                height = entry.devicePixelContentBoxSize[0].blockSize;
                dpr    = 1;
            }
            else if(entry.contentBoxSize) {
                if(entry.contentBoxSize[0]) {
                    width  = entry.contentBoxSize[0].inlineSize;
                    height = entry.contentBoxSize[0].blockSize;
                }
                else {
                    width  = entry.contentBoxSize[0].inlineSize;
                    height = entry.contentBoxSize[0].blockSize;
                }
            }
            else {
                width  = entry.contentRect.width;
                height = entry.contentRect.height;
            }
            const displayWidth  = Math.round(width * dpr);
            const displayHeight = Math.round(height * dpr);
            this.canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
        }
    }
}