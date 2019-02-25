import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Dashboard extends Component {
  AddRecipe = e => {
    e.preventDefault();
    this.props.history.push("/recipe");
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container" style={{ height: "auto" }}>
        <div style={{ height: "75vh" }} className="container">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                Hey there, <b> {user.name}</b>
                <p className="flow-text grey-text text-darken-1">
                  You are logged into Dbarti.tn app{" "}
                  <span role="img" aria-label="clap">
                    👏
                  </span>
                </p>
              </h4>
            </div>
          </div>

          <div className="row">
            <div
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick=  {this.AddRecipe}
              className="btn btn-large waves-effect waves-light hoverable orange accent-3 addrecipe"
            >
              Add_Recipe
            </div>
          </div>


        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Dashboard);
