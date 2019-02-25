import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import {
  getUserRecipes,
  getRecipe,
  like,
  unlike,
  getLikes
} from "../../actions/recipeActions";
import Spinner from "./Profile's components/spinner";
import "./OneRecipe.scss";

class OneRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      recipeLocal: {},
      loading: true
    };
  }
  componentDidMount() {
    this.props.getLikes(this.props.recipe.recipeSelected._id);
    this.props.getRecipe(this.props.recipe.recipeSelected._id);
    this.props.getProfile(this.props.auth.user.id);
    if (this.props.recipe.likes.includes(this.props.auth.user.id)) {
      this.setState({ liked: " liked" });
    } else {
      this.setState({ liked: "" });
      this.props.unlike(this.props.auth.user.id, this.state.recipeLocal._id);
    }
  }
  componentWillReceiveProps(next) {
    this.setState(
      {
        recipeLocal: next.recipe.recipeSelected
      },
      () => {}
    );

    if (this.state.recipeLocal) {
      this.setState({ loading: false });
      if (next.recipe.likes === this.props.recipe.likes) { //i did it by trying, my logic was to check if state changed, but unchanged state worked
        this.props.getLikes(this.props.recipe.recipeSelected._id);
      }
    }
  }

  like = e => {
    e.preventDefault();
    if (!this.state.liked) {
      this.setState({ liked: " liked" });
      this.props.like(this.props.auth.user.id, this.state.recipeLocal._id);
    } else {
      this.setState({ liked: "" });
      this.props.unlike(this.props.auth.user.id, this.state.recipeLocal._id);
    }
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      let { recipePhoto } = this.state.recipeLocal;
      recipePhoto = !recipePhoto ? "" : recipePhoto.split("\\").join("/");
      return (
        <div className="container cardBody">
          <div className="cardRecipe">
            <div
              className="header"
              style={{
                background: "url(" + recipePhoto + ") no-repeat center"
              }}
            >
              <div className="icon">
                <a href="#">
                  <i
                    className={`fa fa-heart ${this.state.liked}`}
                    onClick={this.like}
                  />
                </a>
              </div>
            </div>
            <div className="text">
              <h1 className="food">{this.state.recipeLocal.recipeTitle}</h1>
              <i className="fa fa-clock-o">
                {" "}
                {this.state.recipeLocal.preparationTime} Mins
              </i>
              <i class="fas fa-thumbs-up">
                {" "}
                {this.props.recipe.likes.length} likes 
              </i>
            
              <i className="fa fa-users">
                {" "}
                Serves {this.state.recipeLocal.servingNumber}
              </i>

              <div className="stars">
                <li>
                  <a href="#">
                    <i className="fa fa-star" />
                  </a>
                  <a href="#">
                    <i className="fa fa-star" />
                  </a>
                  <a href="#">
                    <i className="fa fa-star" />
                  </a>
                  <a href="#">
                    <i className="fa fa-star" />
                  </a>
                  <a href="#">
                    <i className="fa fa-star" />
                  </a>
                  <p className="red-text">comming soon...</p>
                </li>
              </div>
              <p className="info">{this.state.recipeLocal.text}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
OneRecipe.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  getLikes: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getProfile, getRecipe,getUserRecipes, like, unlike, getLikes }
)(OneRecipe);
