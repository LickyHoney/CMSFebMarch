import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="centered">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <h1>
              <b>Welcome to CMSIndoor</b>
              </h1>
              
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
