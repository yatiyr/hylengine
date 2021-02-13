/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-var */


export class ShaderProgram {

    gl     : any;
    program: any;

    constructor(gl) {
        this.gl      = gl;
        this.program = gl.createProgram();
    }


    createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

}