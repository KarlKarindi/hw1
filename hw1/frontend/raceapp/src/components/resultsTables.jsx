import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";

@observer
class ResultsTable extends Component {
  @observable results = [];
  @observable readyForRace = false;
  @observable athletesResults = {};
  @observable timerToDisplayableFormat = {};

  componentDidMount() {
    this.generateTimingPoints(toJS(this.props.athletes));
  }

  // Shuffles athletes array so that times are given to athletes randomly.
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateTimingPoints = athletes => {
    let id;
    for (id = 1; id < athletes.length + 1; id++) {
      const corridorTime = Math.floor(Math.random() * (+13000 - +6000)) + +6000;
      const finishTime =
        Math.floor(Math.random() * (+18000 - +corridorTime)) +
        +(corridorTime + 3000);
      let result = [corridorTime, finishTime];
      this.results.push(result);
      this.athletesResults[id] = result;

      // Convert timer time, which is an int, to a displayable format.
      this.timerToDisplayableFormat[result[0]] = this.convertTimerToMinSecMsec(
        result[0]
      );
      this.timerToDisplayableFormat[result[1]] = this.convertTimerToMinSecMsec(
        result[1]
      );
    }

    console.log(toJS(this.athletesResults));
    this.readyForRace = true;
  };

  convertTimerToMinSecMsec = time => {
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    let cntsecs = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}:${cntsecs}`;
  };

  getKey = (dict, val) => {
    for (let key in dict) {
      if (dict[key][0] === val[0] && dict[key][1] === val[1]) {
        return key;
      }
    }
  };

  render() {
    if (this.readyForRace === true) {
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
        <React.Fragment>
          <div className="rowA">
            <div className="athletesTable m-4">
              <h3 className="text-center">Finish corridor</h3>
              {corridorResults.map(results => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center m-2"
                  key={this.getKey(toJS(this.athletesResults), results)}
                >
                  {this.getKey(toJS(this.athletesResults), results)}{" "}
                  {this.timerToDisplayableFormat[results[0]]}
                  <span className="badge badge-info badge-pill m-2" />
                </li>
              ))}
            </div>

            <div className="athletesTable m-4">
              <h3 className="text-center">Finish Line</h3>
              {finishResults.map(results => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center m-2"
                  key={this.getKey(toJS(this.athletesResults), results)}
                >
                  {this.getKey(toJS(this.athletesResults), results)}{" "}
                  {this.timerToDisplayableFormat[results[1]]}
                  <span className="badge badge-info badge-pill m-2" />
                </li>
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>Starting race...</div>;
    }
  }
}

export default ResultsTable;
