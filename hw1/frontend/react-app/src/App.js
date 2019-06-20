import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AthletesTable from "./components/athletesTable";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar totalRunners={6} />
        <main className="container">
          <div>
            <AthletesTable>Siin peaks olema</AthletesTable>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
