import React from "react";

const Navbar = ({ totalRunners }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Number of runners in total{" "}
        <span className="badge badge-pill badge-secondary m-1">
          {totalRunners}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
