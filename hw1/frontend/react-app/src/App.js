import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import StartingAthletesTable from "./components/startingAthletesList";
import StartButton from "./components/startButton";

class App extends Component {
  state = {
    started: false
  };
  render() {
    return (
      <React.Fragment>
        <Navbar totalRunners={6} />
        <main className="container">
          <div>
            <StartButton
              onClick={() => {
                this.props.started = true;
              }}
            />
            <StartingAthletesTable />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
