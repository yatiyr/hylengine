/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as webglUtils from '../../webglUtils';

//  ----------------------------------- IMPORT SHADERS ----------------------------//
import {fragmentShaderSource} from '../../shaders/simpleShader/simpleShaderFrag';
import {vertexShaderSource} from '../../shaders/simpleShader/simpleShaderVert';
import { Rectangle } from './rectangle';
//  -------------------------------------------------------------------------------//



export class RectangleFactory {


    gl      : any;
    program : any;

    positionAttributeLocation : any;
    resolutionUniformLocation : any;
    colorLocation             : any;
    positionBuffer            : any;
    vao                       : any;

    size : any;
    type : any;
    normalize : any;
    stride    : any;
    offset    : any;
    

    constructor(gl) {

        this.gl      = gl;
        this.program = webglUtils.createProgram(gl, vertexShaderSource, fragmentShaderSource);

        this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
        this.resolutionUniformLocation = gl.getUniformLocation(this.program, "u_resolution");
        this.colorLocation             = gl.getUniformLocation(this.program, "u_color");

        this.positionBuffer = gl.createBuffer();
        this.vao            = gl.createVertexArray();

        this.size = 2;
        this.type = gl.FLOAT;
        this.normalize = false;
        this.stride    = 0;
        this.offset    = 0;

    }

    createRectangle(x,y,width,height,color) {
        var rect = new Rectangle(this.gl,
                                 this.program,
                                 this.positionAttributeLocation,
                                 this.resolutionUniformLocation,
                                 this.colorLocation,
                                 this.positionBuffer,
                                 this.vao,
                                 this.size,
                                 this.type,
                                 this.normalize,
                                 this.stride,
                                 this.offset,
                                 x,y,width,height,color);

        return rect;
    }

}