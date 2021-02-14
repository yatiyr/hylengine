/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ShaderProgram} from "../ShaderProgram";

export abstract class Primitive {

    gl                        : any;
    sprogram                  : any;

    canvas                    : any;

    constructor() {
        this.gl = "";
        this.sprogram = "";
    }

    bindToRenderer(gl, program, canvas) {
        this.gl = gl;
        this.sprogram = program;
        this.canvas   = canvas;
    }
}