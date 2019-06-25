import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import StartingAthletesTable from "./components/startingAthletesList";
import StartButton from "./components/startButton";
import Stopwatch from "./components/stopwatch";

class App extends Component {
  state = {
    started: false
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
          <h1>Started lol</h1>
          <Stopwatch />
        </React.Fragment>
      );
    }
  }
}

export default App;
