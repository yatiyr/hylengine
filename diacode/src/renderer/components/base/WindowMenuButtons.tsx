/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {hot} from "react-hot-loader/root";
import React, {Component} from 'react';

import MinimizeSvg   from "../../../../public/img/svg/minimize.svg";
import MaximizeSvg   from "../../../../public/img/svg/maximize.svg";
import UnmaximizeSvg from "../../../../public/img/svg/unmaximize.svg";
import CloseSvg      from "../../../../public/img/svg/close.svg";

type Props = {}


const remote = require('electron').remote;

type Workspace = {
    folderPath: string;
    changePath: () => void;
    pathSelected: boolean;
}

type State = {

};


class WindowMenuButtons extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            maximized: true
        }
  }

  componentDidMount() {
      const electron_window = remote.getCurrentWindow();
      electron_window.on('maximize', () => {
        this.setState({maximized: true});
      });
      electron_window.on('unmaximize', () => {
        this.setState({maximized: false});
      });

  }

  public handleMaximize() {
      var electron_window = remote.getCurrentWindow();

      if(!electron_window.isMaximized()) {
        this.setState({maximized: false});
        electron_window.maximize();
      }
      else {
        this.setState({maximized: true});
        electron_window.unmaximize();
      }

  }

  public getMaximizeSvg() {

    var electron_window = remote.getCurrentWindow() ;

    if(!electron_window.isMaximized()) {
        return(<MaximizeSvg className="threebuttons_maximize_icon"/>);
    }
    else {
        return(<UnmaximizeSvg className="threebuttons_maximize_icon"/>)
    }
  }

  public handleClose() {
    var electron_window = remote.getCurrentWindow();
    electron_window.close()
  }

  public handleMinimize() {
    var electron_window = remote.getCurrentWindow();
    electron_window.minimize();
  }


  render() {
    return(
        <div className="threebuttons">
            <div className="threebuttons_minimize" onClick={this.handleMinimize.bind(this)}>
                <div className="threebuttons_iconContainer">
                    <MinimizeSvg className="threebuttons_minimize_icon"/>
                </div>
            </div>
            <div className="threebuttons_maximize" onClick={this.handleMaximize.bind(this)}>
                <div className="threebuttons_iconContainer">
                    {this.getMaximizeSvg()}
                </div>
            </div>
            <div className="threebuttons_close" onClick={this.handleClose.bind(this)}>
                <div className="threebuttons_iconContainer">
                    <CloseSvg className="threebuttons_close_icon"/>
                </div>
            </div>
        </div>  
        )
    }
}

export default hot(WindowMenuButtons);