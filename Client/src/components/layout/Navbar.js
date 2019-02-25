import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
class Navbar extends Component {
  render() {
    return (
      <div className="col s12 navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center  orange-text"
            >
              <img src={require("./leg.png")} width="60px" height="40px" alt="food"></img>
              Dbarti
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
