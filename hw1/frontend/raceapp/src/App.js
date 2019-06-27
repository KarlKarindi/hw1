import React, { Component } from "react";
import "./css/App.css";
import { observable } from "mobx";
import { observer } from "mobx-react";
import Navbar from "./components/navbar";
import StartButton from "./components/startButton";
import StartingAthletesList from "./components/startingAthletesList";
import Stopwatch from "./components/stopwatch";
import ResultsTable from "./components/resultstable";

@observer
class App extends Component {
  @observable runnersAmount = 7;
  @observable raceStarted = false;
  @observable timerOn = false;
  @observable timerTime = 0;
  @observable timerStart = 0;

  handleStartButtonClicked = () => {
    this.raceStarted = true;
  };

  startTimer = () => {
    this.timerOn = true;
    this.timerTime = this.timerTime;
    this.timerStart = Date.now() - this.timerTime;
    this.timer = setInterval(() => {
      this.timerTime = Date.now() - this.timerStart;
    });
  };

  stopTimer = () => {
    this.timerOn = false;
    clearInterval(this.timer);
  };

  render() {
    if (this.raceStarted !== true) {
      return (
        <React.Fragment>
          <Navbar runnersAmount={this.runnersAmount} />
          <StartButton onClick={this.handleStartButtonClicked} />
          <StartingAthletesList />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Navbar runnersAmount={this.runnersAmount} />
          <Stopwatch
            timerTime={this.timerTime}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <ResultsTable />
        </React.Fragment>
      );
    }
  }
}

export default App;
