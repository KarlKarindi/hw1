import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AthletesTable from "./components/athletesTable";

function App() {
  
  return (
    <React.Fragment>
      <Navbar totalRunners={6} />
      <main className="container">
        <AthletesTable>
          Siin peaks olema
        </AthletesTable>
        
      </main>
    </React.Fragment>
  );
}

export default App;
