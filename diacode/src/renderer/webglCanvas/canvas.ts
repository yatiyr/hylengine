/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {mat4} from "gl-matrix";

const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;

const fsSource = `
    void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

export class Canvas {

    greeting: string;
    canvas: any;
    canvasContext: any;
    shaderProgram: any;
    programInfo: any;

    constructor(message: string) {
        this.greeting = message;
        this.canvas = "";
        this.shaderProgram = "";
        this.programInfo = "";
    }

    initializeCanvas() : any {       
        // Initialize canvas

        
        this.canvas = <HTMLCanvasElement> document.querySelector("#glCanvas");
        console.log(this.canvas);
        
        this.canvasContext = this.canvas.getContext("webgl",{antialias: true});
        
        
        if(this.canvasContext == null) {
            alert("Unable to initialize canvas, webgl is not supported");
            return;
        }

        this.canvasContext.clearColor(0.7, 0.0, 0.25, 1.0);
        this.canvasContext.clear(this.canvasContext.COLOR_BUFFER_BIT);

    }

    drawCommand() {
        this.shaderProgram = this.initializeShaderProgram(this.canvasContext, vsSource, fsSource);
        this.programInfo = {
            program: this.shaderProgram,
            attribLocations: {
                vertexPosition: this.canvasContext.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
            },
            uniformLocations: {
                projectionMatrix: this.canvasContext.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
                modelViewMatrix: this.canvasContext.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
            },
        };

        const buffers = this.initBuffers(this.canvasContext);
        this.draw(this.canvasContext, this.programInfo, buffers);
    }

    loadShader(gl : any, type : any, source : any) : any {
        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('Could not compile shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader();
            return null;

        }

        return shader;
    }

    initializeShaderProgram(gl, vsSource, fsSource) {
        const vertexShader   = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Coult not initialize shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return;
        }

        return shaderProgram;

    }

    initBuffers(gl) {

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const positions = [
            -1.0,  1.0,
             1.0,  1.0,
            -1.0, -1.0,
             1.0, -1.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER,
                      new Float32Array(positions),
                      gl.STATIC_DRAW);

        return {
            position: positionBuffer,
        };
    }

    draw(gl, programInfo, buffers) {
        gl.clearColor(0.7, 0.0, 0.25, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const fieldOfView = 45 * Math.PI / 180;
        const aspect = 1;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();

        mat4.perspective(projectionMatrix,
                         fieldOfView,
                         aspect,
                         zNear,
                         zFar);

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix,
                       modelViewMatrix,
                       [-0.0, 0.0, -6.0]);

        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;

            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset
            );
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition
            );
        }

        gl.useProgram(programInfo.program);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix
        );

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix
        );

        {
            const offset = 0;
            const vertexCount = 4;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }

    greet() : string {
        return "Hello, " + this.greeting;
    }
}



