import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../../actions/profileActions";
import { getUserRecipes } from "../../../actions/recipeActions";
import Spinner from "./spinner";
import Card from "./TaggedContentCard/index.js"

import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserData: {},
      recipes:{},
      loading: true
    };
  }

  componentDidMount() {
    this.props.getProfile(this.props.auth.user.id);
    this.props.getUserRecipes(this.props.auth.user.id)
  }

  componentWillReceiveProps(next) {
    this.setState(
      {currentUserData: next.profile.current,
      recipes:next.recipe.recipesOfUser},
      () => {}
    );
    if (this.state.currentUserData && this.state.recipes) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else
      return (
        <div className="profileCss">
          <div className="wrapper">
            <div className="scroll-downs">
              <div className="mousey">
                <div className="scroller" />
              </div>
            </div>
            <div className="wrapper-inner">
              <div className="box-wrapper">
                <div className="box">
                  <div className="avatar">
                    <img
                      src={this.state.currentUserData.userPhoto? this.state.currentUserData.userPhoto : ""}
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="box-inner">
                    <h3 className="name"> {this.state.currentUserData.name}</h3>
                    <h4 className="age">
                      {this.state.currentUserData.age? this.state.currentUserData.age : ""} years old
                    </h4>
                    <p className="location">
                      <i className="fa fa-map-marker" />
                      Tunis, Tunisia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="oneRecipe row">
          <h2 className="col l12 s12 orange-text center">My Recipes</h2>
              {!this.state.recipes? <p className="center red-text">No recipes entered</p>: this.state.recipes.map((el, i) => 
                <div key={i} className="col l4 s12 m6" id={el._id}>
                <Card  recipe={el}/>
                </div>
              )}
            </div>
          </div>
      );
  }
}
Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getUserRecipes:PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  recipe:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth:state.auth,
  recipe:state.recipe
});
export default connect(
  mapStateToProps,
  { getProfile,getUserRecipes }
)(Profile);
