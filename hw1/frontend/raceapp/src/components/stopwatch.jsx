import React, { Component } from "react";

class Stopwatch extends Component {
  componentDidMount() {
    this.props.startTimer();
  }

  render() {
    const { timerTime } = this.props;
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let cntseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    return (
      <div className="Stopwatch m-2">
        <div className="Stopwatch-display">
          {minutes} : {seconds} : {cntseconds}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
