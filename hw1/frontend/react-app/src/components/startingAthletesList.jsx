import React, { Component } from "react";

class StartingAthletesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      athletes: []
    };
  }

  componentDidMount() {
    const url = "http://localhost:8081/api/athletes";
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          loading: false,
          athletes: Object.values(json)[0]
        });
      });
  }

  render() {
    let { loading, athletes } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h3 className="text-center">
            Competing athletes and their starting positions
          </h3>
          <div className="athletesTable m-4">
            {athletes.map(athlete => (
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
