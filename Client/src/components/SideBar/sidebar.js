import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./sidebar.scss";

class SideBar extends React.Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    
    return (
        <div className="nav-wrapper transparent navigation">
          <a
            href=""
            data-activates="mobile-demo"
            className="button-collapse show-on-large btn-floating btn-large pulse blue"
          >
            <i className="large hamburger material-icons white-text">menu</i>
          </a>

          <ul className="side-nav grey darken-2 " id="mobile-demo">
            <li className="sidenav-header blue">
              <div className="row">
                <div className="col s4">
                <a href={"/user/"+this.props.auth.user.id}>
                  <img
                    src={this.props.auth.user.userPhoto}
                    width="70px"
                    height="75px"
                    alt="ProfileImage"
                    className="circle responsive-img valign profile-image"
                  />
                  </a>
                </div>
                <div className="col s8 name " >
                  <a className="white-text large" href={"/user/"+this.props.auth.user.id}>
                    {this.props.auth.user.name}
                  </a>
                </div>
              </div>
            </li>

            <li className="blue">
              <ul className="collapsible collapsible-accordion" />
            </li>
            <li className="white">
              <a href={"/user/"+this.props.auth.user.id} className="waves-effect waves-blue">
                <i className="material-icons">person</i>
                <span className="left">Profile</span>
              </a>
            </li>

            <li className="white">
              <a href="../recipe" className="waves-effect waves-blue">
                <i className="material-icons">border_color</i>
                <span className="left">Right your recipe</span>
              </a>
            </li>

            <li className="white">
              <a href="#" className="waves-effect waves-blue">
                <i className="material-icons">search</i>{" "}
                <span className="left">Search a recipe</span>
              </a>
            </li>
            <li className="white" />
            <li className="white">
              <a href="#" className="waves-effect waves-blue">
                <i className="material-icons ">settings</i>
                <span className="left">Setting</span>
                <span className="new badge right yellow darken-3">
                  Upcomming
                </span>
              </a>
            </li>
            <li className="white">
              <a href="#" className="waves-effect waves-blue">
                <i className="material-icons">language</i>{" "}
                <span className="left">Select lang.</span>
                <span className="new badge right yellow darken-3">
                  Upcomming
                </span>
              </a>
            </li>
            <li className="sidenav-footer  lighten-1">
              <div className="row">
                <div className="social-icons">
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-linkedin-in "></i>
                    </a>
                  </div>
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-google-plus-g"></i>
                    </a>
                  </div>
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-pinterest-p"></i>
                    </a>
                  </div>
                  <div className="col s2">
                    <a href="#">
                    <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="divider"></li>
            <li>
              <a href="#" onClick={this.onLogoutClick}>
                <i className="material-icons red-text darken-3">exit_to_app</i>
                <span className="left red-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
    
    );
  }
}

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(SideBar);
