import React, { Component } from "react";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    });
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return (
      <div className="Stopwatch m-2">
        <div className="Stopwatch-display">
          {minutes} : {seconds} : {centiseconds}
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button className="btn btn-primary m-3" onClick={this.startTimer}>
              Start
            </button>
          )}
          {this.state.timerOn === true && (
            <button className="btn btn-primary m-3" onClick={this.stopTimer}>
              Stop
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
