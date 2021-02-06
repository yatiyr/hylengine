/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {hot} from "react-hot-loader/root";
import React, {Component} from 'react';

import {Canvas} from "../../webglCanvas/canvas";

type Props = {}


const remote = require('electron').remote;

type Workspace = {
    folderPath: string;
    changePath: () => void;
    pathSelected: boolean;
}

type State = {

};


class CanvasReact extends Component<Props, State> {
  canvas: Canvas;
    constructor(props) {
        super(props);

        this.canvas = new Canvas("naber");
  }

  componentDidMount() {
    this.canvas.initializeCanvas();
    this.canvas.drawCommand();
  }


  render() {
    return(
        <canvas className="hylCanvas" id="glCanvas"/>
        )
    }
}

export default hot(CanvasReact);