import React from "react";

const Navbar = ({ runnersAmount }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Number of runners in total{" "}
        <span className="badge badge-pill badge-secondary m-1">
          {runnersAmount}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
