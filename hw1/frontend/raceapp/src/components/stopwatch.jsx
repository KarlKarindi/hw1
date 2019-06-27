import React, { Component } from "react";
import { observable } from "mobx";

class Stopwatch extends Component {
  componentDidMount() {
    this.props.startTimer();
  }

  render() {
    return (
      <div className="Stopwatch m-2">
        <div className="Stopwatch-display">
          {this.props.minutes} : {this.props.seconds} : {this.props.cntsecs}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
