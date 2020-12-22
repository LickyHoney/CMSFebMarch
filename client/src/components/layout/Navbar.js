import React, { Component } from "react";
import { Link } from "react-router-dom";
import DashBoard from "../dashboard/Dashboard";
//import HomePage from "../dashboard/HomePage";


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
              {/* <div><HomePage /></div> */}
              <div class = "logout">
   <DashBoard />
   </div>
              </h1>
              
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
