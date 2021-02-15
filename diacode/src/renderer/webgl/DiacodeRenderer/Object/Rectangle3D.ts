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

    translationMat : mat4;

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

        this.translationMat = mat4.create();

        mat4.translate(this.translationMat, this.translationMat, [.2, .5, -2]);
        mat4.scale(this.translationMat, this.translationMat, [0.25, 0.25, 0.25]);

    }

    bindToRenderer(gl, program) {
        super.bindToRenderer(gl, program);

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

      var projectionmat = mat4.create();

      mat4.perspective(projectionmat,
        glMatrix.toRadian(75),
        this.gl.canvas.width/this.gl.canvas.height,
        1e-4,
        1e4
      );

      console.log(this.gl.canvas.width, this.gl.canvas.height);

      const finalMatrix = mat4.create();


      mat4.rotateX(this.translationMat, this.translationMat, Math.PI/2 / 360);
      mat4.mul(finalMatrix, projectionmat, this.translationMat);


      this.gl.uniformMatrix4fv(this.sprogram.matrixLocation, false, finalMatrix);

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

              // Front
              0.5, 0.5, 0.5,
              0.5, -.5, 0.5,
              -.5, 0.5, 0.5,
              -.5, 0.5, 0.5,
              0.5, -.5, 0.5,
              -.5, -.5, 0.5,

              // Left
              -.5, 0.5, 0.5,
              -.5, -.5, 0.5,
              -.5, 0.5, -.5,
              -.5, 0.5, -.5,
              -.5, -.5, 0.5,
              -.5, -.5, -.5,

              // Back
              -.5, 0.5, -.5,
              -.5, -.5, -.5,
              0.5, 0.5, -.5,
              0.5, 0.5, -.5,
              -.5, -.5, -.5,
              0.5, -.5, -.5,

              // Right
              0.5, 0.5, -.5,
              0.5, -.5, -.5,
              0.5, 0.5, 0.5,
              0.5, 0.5, 0.5,
              0.5, -.5, 0.5,
              0.5, -.5, -.5,

              // Top
              0.5, 0.5, 0.5,
              0.5, 0.5, -.5,
              -.5, 0.5, 0.5,
              -.5, 0.5, 0.5,
              0.5, 0.5, -.5,
              -.5, 0.5, -.5,

              // Bottom
              0.5, -.5, 0.5,
              0.5, -.5, -.5,
              -.5, -.5, 0.5,
              -.5, -.5, 0.5,
              0.5, -.5, -.5,
              -.5, -.5, -.5,
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
              100,  70, 120,
              100,  70, 120,
              100,  70, 120,
              100,  70, 120,
              100,  70, 120,
              100,  70, 120,
      
                // middle rung front
              50,  70, 120,
              50,  70, 120,
              50,  70, 120,
              50,  70, 120,
              50,  70, 120,
              50,  70, 120,
      
                // left column back
              80, 170, 200,
              80, 170, 200,
              80, 170, 200,
              80, 170, 200,
              80, 170, 200,
              80, 170, 200,
      
                // top rung back
              80, 70, 100,
              80, 70, 100,
              80, 70, 100,
              80, 70, 100,
              80, 70, 100,
              80, 70, 100,
      
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