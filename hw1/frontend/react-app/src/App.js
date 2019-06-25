import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import StartingAthletesTable from "./components/startingAthletesList";
import StartButton from "./components/startButton";
import Stopwatch from "./components/stopwatch";

class App extends Component {
  state = {
    started: false,
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

  handleStart = () => {
    const started = true;
    this.setState({ started });
  };

  render() {
    if (this.state.started !== true) {
      return (
        <React.Fragment>
          <Navbar totalRunners={6} />
          <main className="container">
            <div>
              <StartButton onStart={this.handleStart} />
              <StartingAthletesTable />
            </div>
          </main>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Navbar totalRunners={6} />
          <Stopwatch
            timerTime={this.state.timerTime}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
        </React.Fragment>
      );
    }
  }
}

export default App;
