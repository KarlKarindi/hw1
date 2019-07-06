import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class StartButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div>
        <center>
          <button
            id="startButton"
            type="button"
            className="btn btn-primary m-3"
            onClick={onClick}
          >
            Start race
          </button>
        </center>
      </div>
    );
  }
}

export default StartButton;
