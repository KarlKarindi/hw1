import React, { Component } from "react";
import { toJS } from "mobx";

class ResultsList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.corridorResults.length < this.props.corridorResults.length) {
      console.log(
        "update CorridorResults length",
        this.props.corridorResults.length
      );
    }
  }

  render() {
    const {
      corridorResults,
      getKey,
      idToAthleteStartNum,
      idToAthleteName,
      idToResults
    } = this.props;

    return (
      <div>
        <div className="athletesResultsTable m-5">
          <h3 className="text-center">Finish corridor</h3>
          {corridorResults.map(results => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center m-2"
              key={getKey(toJS(idToResults), results)}
            >
              <b>{idToAthleteName[getKey(toJS(idToResults), results)]}</b>
              {idToAthleteStartNum[getKey(toJS(idToResults), results)]}
              <span className="badge badge-info badge-pill m-2" />
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default ResultsList;
