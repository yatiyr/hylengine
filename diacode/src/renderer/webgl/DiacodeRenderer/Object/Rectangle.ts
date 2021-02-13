/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Primitive } from "./Primitive";


export class Rectangle extends Primitive {

    x       : number;
    y       : number;
    width   : number;
    height  : number;
    color   : number[];

    constructor(x,
                y,
                width,
                height,
                color) {

        super();    

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.color   = color;

    }

    draw() {
      
      this.gl.bindVertexArray(this.sprogram.vao);
      this.gl.enableVertexAttribArray(this.sprogram.positionAttributeLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprogram.positionBuffer);
      this.gl.vertexAttribPointer(this.sprogram.positionAttributeLocation, 
                                  this.sprogram.size, 
                                  this.sprogram.type, 
                                  this.sprogram.normalize, 
                                  this.sprogram.stride, 
                                  this.sprogram.offset);
      this.gl.useProgram(this.sprogram.program);
      this.gl.bindVertexArray(this.sprogram.vao);
      this.gl.uniform2f(this.sprogram.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

      var x1 = this.x;
      var x2 = this.x + this.width;
      var y1 = this.y;
      var y2 = this.y + this.height;

      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
     ]), this.gl.STATIC_DRAW);

      this.gl.uniform4f(this.sprogram.colorLocation, this.color[0],
                                            this.color[1],
                                            this.color[2],
                                            this.color[3]);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    }

    setPosition(x,y) {
      this.x = x;
      this.y = y;
    }


}