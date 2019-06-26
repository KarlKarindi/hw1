import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import Navbar from "./components/navbar";
import StartButton from "./components/startButton";
import StartingAthletesList from "./components/startingAthletesList";

@observer
class App extends Component {
  @observable runnersAmount = 7;
  @observable raceStarted = false;

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
      return <div>started lol</div>;
    }
  }

  handleStartButtonClicked = () => {
    this.raceStarted = true;
  };
}

export default App;
