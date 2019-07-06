import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class StartingAthletesList extends Component {
  @observable loading = true;

  render() {
    if (this.props.athletes.length === 0) {
      return (
        <center>
          <div>Loading athletes...</div>
          <div>App does not work without athletes.</div>
          <div>
            If you are seeing this, the athletes have not been loaded correctly
            from the database.
          </div>
        </center>
      );
    } else {
      return (
        <React.Fragment>
          <h3 className="text-center">
            Competing athletes and their starting positions
          </h3>
          <center>
            <div className="athletesTable m-4">
              {this.props.athletes.map(athlete => (
                <li
                  id="startingAthlete"
                  className="list-group-item d-flex justify-content-between align-items-center m-2"
                  key={athlete.id}
                >
                  {athlete.firstName} {athlete.secondName}
                  <span className="badge badge-info badge-pill m-2">
                    {athlete.startingNumber}
                  </span>
                </li>
              ))}
            </div>
          </center>
        </React.Fragment>
      );
    }
  }
}

export default StartingAthletesList;
