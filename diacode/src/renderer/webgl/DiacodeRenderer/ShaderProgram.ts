/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-var */


export class ShaderProgram {

    program: any;

    constructor(gl, vertexShaderSource, fragmentShaderSource) {
        this.program = gl.createProgram();

        var vertShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        gl.attachShader(this.program, vertShader);
        gl.attachShader(this.program, fragShader);
        gl.linkProgram(this.program);

        var success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if(!success) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
        }
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