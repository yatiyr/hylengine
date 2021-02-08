/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


export class Rectangle {

    gl                        : any;
    program                   : any;
    positionAttributeLocation : any;
    resolutionUniformLocation : any;
    colorLocation             : any;
    positionBuffer            : any;
    vao                       : any;
    size                      : any;
    type                      : any;
    normalize                 : any;
    stride                    : any;
    offset                    : any;

    x       : number;
    y       : number;
    width   : number;
    height  : number;
    color   : number[];

    constructor(gl,
                program,
                positionAttributeLocation,
                resolutionUniformLocation,
                colorLocation,
                positionBuffer,
                vao,
                size,
                type,
                normalize,
                stride,
                offset,
                x,y,width,height,color) {

        this.gl                        = gl;
        this.program                   = program;
        this.positionAttributeLocation = positionAttributeLocation;
        this.resolutionUniformLocation = resolutionUniformLocation;
        this.colorLocation             = colorLocation;
        this.positionBuffer            = positionBuffer;
        this.vao                       = vao;
        this.size                      = size;
        this.type                      = type;
        this.normalize                 = normalize;
        this.stride                    = stride;
        this.offset                    = offset;          

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.color   = color;

    }

    draw() {
      
      this.gl.bindVertexArray(this.vao);
      this.gl.enableVertexAttribArray(this.positionAttributeLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(this.positionAttributeLocation, 
                                  this.size, 
                                  this.type, 
                                  this.normalize, 
                                  this.stride, 
                                  this.offset);
      this.gl.useProgram(this.program);
      this.gl.bindVertexArray(this.vao);
      this.gl.uniform2f(this.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

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

      this.gl.uniform4f(this.colorLocation, this.color[0],
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