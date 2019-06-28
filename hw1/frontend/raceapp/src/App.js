import React, { Component } from "react";
import "./css/App.css";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import Navbar from "./components/navbar";
import StartButton from "./components/startButton";
import StartingAthletesList from "./components/startingAthletesList";
import Stopwatch from "./components/stopwatch";
import ResultsTables from "./components/resultsTables";

@observer
class App extends Component {
  @observable raceStarted = false;
  @observable timerOn = false;
  @observable timerTime = 0;
  @observable timerStart = 0;
  @observable athletes = [];
  @observable results = [];

  componentDidMount() {
    this.fetchAthletesFromAPI();
  }

  handleStartButtonClicked = () => {
    this.raceStarted = true;
  };

  fetchAthletesFromAPI = () => {
    const url = "http://localhost:8081/api/athletes";
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.loading = false;
        this.athletes = Object.values(json)[0];
      });
  };

  startTimer = () => {
    if (this.athletes.length > 0) {
      this.timerOn = true;
      this.timerTime = this.timerTime;
      this.timerStart = Date.now() - this.timerTime;
      this.timer = setInterval(() => {
        this.timerTime = Date.now() - this.timerStart;
      });
    }
  };

  stopTimer = () => {
    this.timerOn = false;
    clearInterval(this.timer);
  };

  render() {
    if (this.raceStarted !== true) {
      return (
        <React.Fragment>
          <Navbar runnersAmount={toJS(this.athletes.length)} />
          <StartButton onClick={this.handleStartButtonClicked} />
          <StartingAthletesList athletes={this.athletes} />
        </React.Fragment>
      );
    } else {
      let minutes = ("0" + (Math.floor(this.timerTime / 60000) % 60)).slice(-2);
      let seconds = ("0" + (Math.floor(this.timerTime / 1000) % 60)).slice(-2);
      let cntsecs = ("0" + (Math.floor(this.timerTime / 10) % 100)).slice(-2);
      return (
        <React.Fragment>
          <Navbar runnersAmount={toJS(this.athletes.length)} />
          <div className="rowA">
            <Stopwatch
              timerTime={this.timerTime}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              minutes={minutes}
              seconds={seconds}
              cntsecs={cntsecs}
            />
            <div className="table">
              <ResultsTables
                athletes={this.athletes}
                timerTime={this.timerTime}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
