import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class StartingAthletesList extends Component {
  @observable loading = true;
  @observable athletes = [];

  componentDidMount() {
    const url = "http://localhost:8081/api/athletes";
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.loading = false;
        this.athletes = Object.values(json)[0];
      });
  }

  render() {
    if (this.loading === true) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h3 className="text-center">
            Competing athletes and their starting positions
          </h3>
          <div className="athletesTable m-4">
            {this.athletes.map(athlete => (
              <li
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
        </React.Fragment>
      );
    }
  }
}

export default StartingAthletesList;
