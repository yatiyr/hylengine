/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { ShaderProgram } from "./ShaderProgram";
import { ThreeDObjectShader_VertSource, ThreeDObjectShader_FragSource} from '../Shaders/ThreeDObjectShader';
export class ThreeDObjectShaderProgram extends ShaderProgram {

    positionAttributeLocation : any;
    colorAttributeLocation    : any;

    matrixLocation            : any;


    positionBuffer            : any;
    colorBuffer               : any;
    vao                       : any;

    size           : any;
    type           : any;
    colorType      : any;
    normalize      : any;
    colorNormalize : any;
    stride         : any;
    offset         : any;


    constructor(gl) {
        super(gl);

        var vertShader = this.createShader(gl, gl.VERTEX_SHADER, ThreeDObjectShader_VertSource);
        var fragShader = this.createShader(gl, gl.FRAGMENT_SHADER, ThreeDObjectShader_FragSource);

        gl.attachShader(this.program, vertShader);
        gl.attachShader(this.program, fragShader);
        gl.linkProgram(this.program);

        this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
        this.colorAttributeLocation    = gl.getAttribLocation(this.program, "a_color");

        this.matrixLocation            = gl.getUniformLocation(this.program, "u_matrix");
        
        this.positionBuffer = gl.createBuffer();
        this.colorBuffer    = gl.createBuffer();
        this.vao            = gl.createVertexArray();

        this.size      = 3;
        this.type      = gl.FLOAT;
        this.colorType = gl.UNSIGNED_BYTE;
        this.normalize = false;
        this.colorNormalize = true;
        this.stride    = 0;
        this.offset    = 0;
        
        var success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if(!success) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
        }
    }
}