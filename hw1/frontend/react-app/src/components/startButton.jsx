import React, { Component } from "react";

class startButton extends Component {
  state = {
    raceStarted: false
  };

  startRace = () => {
    const raceStarted = true;
    console.log(raceStarted);
    this.setState({ raceStarted });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <center>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={() => this.startRace()}
          >
            Start race
          </button>
        </center>
      </div>
    );
  }
}

export default startButton;
