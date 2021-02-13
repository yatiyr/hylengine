/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {hot} from "react-hot-loader/root";
import React, {Component} from 'react';

import {DiacodeRenderer} from "../../webgl/DiacodeRenderer/DiacodeRenderer";

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
  renderer: DiacodeRenderer | null;
    constructor(props) {
        super(props);

        this.renderer = null;
  }

  componentDidMount() {
    
    this.renderer = new DiacodeRenderer();

    requestAnimationFrame(this.renderer.render.bind(this.renderer));
  }


  render() {
    return(
        <canvas className="hylCanvas" id="diacodeCanvas"/>
        )
    }
}

export default hot(CanvasReact);