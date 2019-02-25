import React, { Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {

  render() {
    return (   
      
      <div style={{ height: "75vh" }} className="container">
       
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Share</b> Recipes with others
            </h4>
            <p className="flow-text grey-text text-darken-1">
            Share your experience
            </p>
            <br />
            
            <a
            href="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </a>
            <a
             href="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
      
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Landing);
