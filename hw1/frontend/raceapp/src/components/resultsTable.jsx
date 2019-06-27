import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";

@observer
class ResultsTable extends Component {
  @observable results = {};
  @observable readyForRace = false;

  componentDidMount() {
    this.generateTimingPoints(toJS(this.props.athletes));
  }

  generateTimingPoints = athletes => {
    let id;
    for (id = 1; id < athletes.length + 1; id++) {
      const corridorTime = Math.floor(Math.random() * (+13000 - +6000)) + +6000;
      const finishTime =
        Math.floor(Math.random() * (+18000 - +corridorTime)) +
        +(corridorTime + 3000);
      this.results[id] = { "0": corridorTime, "1": finishTime };
    }
    this.readyForRace = true;
    console.log(toJS(this.results));
  };

  render() {
    if (this.readyForRace === true) {
      if (this.props.timerTime < 200) {
        console.log(this.props.timerTime);
      }
      return (
        <React.Fragment>
          <div className="athletesTable m-4">
            <h3 className="text-center">Finish corridor</h3>
            {this.props.athletes.map(athlete => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center m-2"
                key={athlete.id}
              >
                {athlete.firstName} {athlete.secondName}
                <span className="badge badge-info badge-pill m-2" />
              </li>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
      return <div>Starting race...</div>;
    }
  }
}

export default ResultsTable;
