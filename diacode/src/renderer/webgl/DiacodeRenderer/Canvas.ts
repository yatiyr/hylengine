/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class Canvas {

    canvasToDisplaySizeMap : any;
    resizeObserver         : any;
    canvas                 : any;
    gl                     : any;


    constructor() {
        this.canvasToDisplaySizeMap = "";
        this.resizeObserver         = "";
        this.canvas                 = "";
        this.gl                     = "";
    }

    resizeCanvasToDisplaySize() {

        const [displayWidth, displayHeight] = this.canvasToDisplaySizeMap.get(this.canvas);

        const needResize = this.canvas.width  != displayWidth ||
                           this.canvas.height != displayHeight;

        if(needResize) {
            this.canvas.width  = displayWidth;
            this.canvas.height = displayHeight;
        }


        return needResize;
    }

    initializeCanvas() {

        this.canvas = <HTMLCanvasElement> document.querySelector("#diacodeCanvas");
        this.gl = this.canvas.getContext("webgl2");
        
        if(this.gl == null) {
            alert("Unable to initialize canvas, webgl2 is not supported");
            return;
        }

        this.startObservingSizeChange();           
        this.canvasToDisplaySizeMap = new Map([[this.canvas, [this.canvas.width, this.canvas.height]]]);
        
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