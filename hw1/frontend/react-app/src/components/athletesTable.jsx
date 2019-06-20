import React, { Component } from "react";

class athletesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      athletes: []
    };
  }

  componentDidMount() {
    console.log("Did mount");
    const url = "http://localhost:8081/api/results";
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
    console.log(athletes);
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h3 class="m-2">Competing athletes and their starting positions</h3>
          <div className="athletesTable">
            {athletes.map(athlete => (
              <li
                class="list-group-item d-flex justify-content-between align-items-center m-2"
                key={athlete.id}
              >
                {athlete.firstName} {athlete.secondName}
                <span class="badge badge-info badge-pill m-2">
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
export default athletesTable;
