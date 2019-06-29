import React, { Component } from "react";
import { toJS } from "mobx";

class ResultsList extends Component {
  // Checks if anyone entered the finish corridor or crossed the finish line.
  componentDidUpdate(prevProps) {
    if (prevProps.corridorResults.length < this.props.corridorResults.length) {
      const {
        corridorResults,
        idToResults,
        getKey,
        timerToDisplayableFormat
      } = this.props;
      let idOfJustEnteredCorridor = getKey(idToResults, corridorResults[0]);
      let enteredCorridorTime =
        timerToDisplayableFormat[toJS(idToResults[idOfJustEnteredCorridor])[0]];

      this.postJSON(idOfJustEnteredCorridor, "0", enteredCorridorTime);
    } else if (
      prevProps.finishResults.length < this.props.finishResults.length
    ) {
      const {
        finishResults,
        idToResults,
        getKey,
        timerToDisplayableFormat
      } = this.props;
      let idOfJustEnteredFinish = getKey(idToResults, finishResults[0]);
      let enteredFinishTime =
        timerToDisplayableFormat[toJS(idToResults[idOfJustEnteredFinish])[1]];
      this.postJSON(idOfJustEnteredFinish, "1", enteredFinishTime);
    }
  }

  // Posts JSON to the server api endpoint.
  postJSON = (idOfAthlete, idOfTimepoint, timePointValue) => {
    fetch("http://localhost:8081/api/results", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        athleteId: idOfAthlete,
        timepointId: idOfTimepoint,
        time: timePointValue
      })
    });
  };

  render() {
    const {
      corridorResults,
      finishResults,
      getKey,
      idToAthleteStartNum,
      idToAthleteName,
      idToResults,
      timerToDisplayableFormat
    } = this.props;

    return (
      <React.Fragment>
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
        <div>
          <div className="athletesResultsTable m-5">
            <h3 className="text-center">Finish Line</h3>
            {finishResults.map(results => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center m-2"
                key={getKey(toJS(idToResults), results)}
              >
                <b>{idToAthleteName[getKey(toJS(idToResults), results)]}</b>{" "}
                {timerToDisplayableFormat[results[1]]}
                <span className="badge badge-info badge-pill m-2" />
              </li>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResultsList;
