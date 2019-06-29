import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import ResultsList from "./resultsList";

@observer
class ResultsTable extends Component {
  @observable results = [];
  @observable idToResults = {};
  @observable idToAthleteName = {};
  @observable idToAthleteStartNum = {};
  @observable timerToDisplayableFormat = {};
  @observable readyForRace = false;

  componentDidMount() {
    this.setAllIdToAthleteNames(toJS(this.props.athletes));
    this.setAllIdToStartNums(toJS(this.props.athletes));
    this.generateTimingPoints(toJS(this.props.athletes));
    if (toJS(this.props.athletes).length > 0) {
      this.readyForRace = true;
    }
  }

  setAllIdToAthleteNames = athletesJSON => {
    let i;
    for (i = 0; i < athletesJSON.length; i++) {
      this.idToAthleteName[athletesJSON[i].id] = `${
        athletesJSON[i].firstName
      } ${athletesJSON[i].secondName}`;
    }
  };

  setAllIdToStartNums = athletesJSON => {
    let i;
    for (i = 0; i < athletesJSON.length; i++) {
      this.idToAthleteStartNum[athletesJSON[i].id] = `${
        athletesJSON[i].startingNumber
      }`;
    }
  };

  // Generating random timing points before the race. Then saving the times in a readable format.
  generateTimingPoints = athletes => {
    let id;
    for (id = 1; id < athletes.length + 1; id++) {
      const corridorTime = Math.floor(Math.random() * (+13000 - +6000)) + +6000;
      const finishTime =
        Math.floor(Math.random() * (+18000 - +corridorTime)) +
        +(corridorTime + 3000);
      let result = [corridorTime, finishTime];
      this.results.push(result);
      this.idToResults[id] = result;

      // Convert timer time, which is an int, to a displayable format.
      this.timerToDisplayableFormat[result[0]] = this.convertTimerToMinSecMsec(
        result[0]
      );
      this.timerToDisplayableFormat[result[1]] = this.convertTimerToMinSecMsec(
        result[1]
      );
    }
  };

  convertTimerToMinSecMsec = time => {
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    let cntsecs = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}:${cntsecs}`;
  };

  // Used for returning the athlete id of specific results.
  getKey = (dict, val) => {
    for (let key in dict) {
      if (dict[key][0] === val[0] && dict[key][1] === val[1]) {
        return key;
      }
    }
  };

  render() {    
    if (this.readyForRace === true) {
      // corridorResults contains only times that the counter has gone over already.
      // Then the results are sorted in descending order. Same with finishResults.
      let corridorResults = toJS(this.results).filter(
        corridorTime => this.props.timerTime > corridorTime[0]
      );
      corridorResults.sort(function(a, b) {
        return b[0] - a[0];
      });

      let finishResults = toJS(this.results).filter(
        finishTime => this.props.timerTime > finishTime[1]
      );
      finishResults.sort(function(a, b) {
        return b[1] - a[1];
      });

      return (
        <div className="tableRowB">
          <ResultsList
            corridorResults={corridorResults}
            finishResults={finishResults}
            getKey={this.getKey}
            idToAthleteName={this.idToAthleteName}
            idToAthleteStartNum={this.idToAthleteStartNum}
            idToResults={this.idToResults}
            results={this.results}
            timerToDisplayableFormat={this.timerToDisplayableFormat}
          />
        </div>
      );
    } else {
      return <div>Starting race...</div>;
    }
  }
}

export default ResultsTable;
