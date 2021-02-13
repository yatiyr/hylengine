/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { ShaderProgram } from "./ShaderProgram";
import { SimpleShader_VertSource, SimpleShader_FragSource} from '../Shaders/SimpleShader';
export class SimpleShaderProgram extends ShaderProgram {

    positionAttributeLocation : any;
    resolutionUniformLocation : any;
    colorLocation             : any;

    positionBuffer            : any;
    vao                       : any;

    size      : any;
    type      : any;
    normalize : any;
    stride    : any;
    offset    : any;


    constructor(gl) {
        super(gl);

        var vertShader = this.createShader(gl, gl.VERTEX_SHADER, SimpleShader_VertSource);
        var fragShader = this.createShader(gl, gl.FRAGMENT_SHADER, SimpleShader_FragSource);

        gl.attachShader(this.program, vertShader);
        gl.attachShader(this.program, fragShader);
        gl.linkProgram(this.program);

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
        
        var success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if(!success) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
        }
    }
}