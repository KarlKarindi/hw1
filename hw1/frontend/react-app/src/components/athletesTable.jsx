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
          athletes: Object.values(json)
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
        <div className="App">
          <ul>
            {athletes.map(item => (
              <li key={item}>Name: {item.firstName}</li>
            ))}
            ;
          </ul>
        </div>
      );
    }
  }
}
export default athletesTable;
