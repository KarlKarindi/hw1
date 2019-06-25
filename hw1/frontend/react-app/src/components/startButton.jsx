import React, { Component } from "react";

class StartButton extends Component {
  render() {
    const { onStart } = this.props;
    return (
      <div>
        <center>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={onStart}
          >
            Start race
          </button>
        </center>
      </div>
    );
  }
}

export default StartButton;
