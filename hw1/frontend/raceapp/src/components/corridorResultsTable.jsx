import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class CorridorResultsTable extends Component {
  @observable results = ["lol"];

  componentDidMount() {
    console.log(this.props.athletes);
    this.generateTimingPoints(this.props.athletes);
  }

  generateTimingPoints = athletes => {
    console.log(athletes);
  };

  render() {
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
  }
}

export default CorridorResultsTable;
