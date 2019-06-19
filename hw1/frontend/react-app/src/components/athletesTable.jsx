import React, { Component } from "react";

class athletesTable extends Component {
  componentDidMount() {
    console.log("Did mount");
    this.getItems();
  }

  getItems() {
    console.log("Fetching data");
    fetch("http://localhost:8081/api/results")
      .then(results => results.json())
      .then(results => console.log(results));
  }

  render() {
    return null;
  }
}

export default athletesTable;
