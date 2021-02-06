/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {hot} from "react-hot-loader/root";
import React, {Component} from 'react';

import WindowMenuButtons from "./base/WindowMenuButtons";

type Props = {}

type Theme = {

}

type Workspace = {
    folderPath: string;
    changePath: () => void;
    pathSelected: boolean;
}

type State = {

};


class App extends Component<Props, State> {

    constructor(props) {
        super(props);
  }

  render() {
    return(
        <div className="contents">
          <div className="main">
            <div className="leftside">
              <div className="leftside_header"></div>
              <div className="leftside_contents">
                <h1>LEFTBAR</h1>
              </div>
            </div>
            <div className="middle">
              <div className="middle_header"></div>
              <div className="middle_contents">
                <h1>MIDDLE</h1>
              </div>
            </div>
            <div className="rightside">
              <div className="rightside_header"></div>
              <div className="rightside_contents">
                <h1>sd</h1>
              </div>
            </div>
            <WindowMenuButtons/>
          </div>
          <div>
            <h1 className="footer">FOOTER</h1>
          </div>
        </div>
        )
    }
}

export default hot(App);