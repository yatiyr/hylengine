/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Primitive } from "./Primitive";
import {mat4, glMatrix, vec3} from 'gl-matrix';

export class Rectangle3D extends Primitive {

    x       : number;
    y       : number;
    z       : number;

    width   : number;
    height  : number;
    depth   : number;

    color   : number[];

    constructor(x,
                y,
                z,
                width,
                height,
                depth,
                color) {

        super();    

        this.x       = x;
        this.y       = y;
        this.z       = z;

        this.width   = width;
        this.height  = height;
        this.depth   = depth;

        this.color   = color;

    }

    bindToRenderer(gl, program, canvas) {
        super.bindToRenderer(gl, program, canvas);

        this.gl.bindVertexArray(this.sprogram.vao);
        this.gl.enableVertexAttribArray(this.sprogram.positionAttributeLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprogram.positionBuffer);

        this.setGeometry();

        this.gl.vertexAttribPointer(this.sprogram.positionAttributeLocation,
                                    this.sprogram.size,
                                    this.sprogram.type,
                                    this.sprogram.normalize,
                                    this.sprogram.stride,
                                    this.sprogram.offset);

        this.gl.enableVertexAttribArray(this.sprogram.colorAttributeLocation);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprogram.colorBuffer);

        this.setColor();

        this.gl.vertexAttribPointer(this.sprogram.colorAttributeLocation,
                                    this.sprogram.size,
                                    this.sprogram.colorType,
                                    this.sprogram.colorNormalize,
                                    this.sprogram.stride,
                                    this.sprogram.offset);

    }

    draw() {
      
      this.gl.useProgram(this.sprogram.program);
      this.gl.bindVertexArray(this.sprogram.vao);

      var mat = mat4.create();

      const [displayWidth, displayHeight] = this.canvas.canvasToDisplaySizeMap.get(this.canvas.canvas);

      mat4.perspective(mat, glMatrix.toRadian(120), displayWidth/displayHeight,
      0, 100);

      this.gl.uniformMatrix4fv(this.sprogram.matrixLocation, false, mat);

      var primitiveType = this.gl.TRIANGLES;
      var offset = 0;
      var count = 12 * 3;
      this.gl.drawArrays(primitiveType, offset, count);

    }

    setPosition(x,y,z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    setGeometry() {
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([
                // front face
                0         ,   0           ,  0,
                0         ,   -this.height,  0,
                this.width,   0           ,  0,
                this.width,   0           ,  0,
                0         ,   -this.height,  0,
                this.width,   -this.height,  0,
      
                // back face
                0         ,   0           ,  this.depth,
                this.width,   0           ,  this.depth,
                0         ,   -this.height,  this.depth,
                this.width,   0           ,  this.depth,
                this.width,   -this.height,  this.depth,
                0         ,   -this.height,  this.depth,                
      
                // middle rung front
                0         ,   -this.height,  0,
                0         ,   -this.height,  this.depth,
                this.width,   -this.height,  0,
                this.width,   -this.height,  0,
                0         ,   -this.height,  this.depth,
                this.width,   -this.height,  this.depth,
      
                // left column back
                0         ,   0           ,  0,
                this.width,   0           ,  0,
                0         ,   0           ,  this.depth,
                this.width,   0           ,  0,
                this.width,   0           ,  this.depth,
                0         ,   0           ,  this.depth,                
      
                // top rung back
                this.width,   -this.height,  0,
                this.width,   -this.height,  this.depth,
                this.width,   0           ,  0,
                this.width,   0           ,  0,
                this.width,   -this.height,  this.depth,
                this.width,   0           ,  this.depth,
      
                // middle rung back
                0         ,   -this.height,  this.depth,
                0         ,   -this.height,  0,
                0         ,   0           ,  0,
                0         ,   0           ,  0,
                0         ,   0           ,  this.depth,
                0         ,   -this.height,  this.depth,
            ]),
            this.gl.STATIC_DRAW);
    }

    setColor() {
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Uint8Array([
                // left column front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // top rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // middle rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // left column back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // top rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // middle rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
            ]),
            this.gl.STATIC_DRAW);
    }


}