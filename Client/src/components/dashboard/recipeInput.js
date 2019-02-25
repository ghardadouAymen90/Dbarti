import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { addRecipe } from "../../actions/recipeActions";

class RecipeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      preparationTime: "00:00",
      servingNumber: "0",
      ing1: "",
      ing2: "",
      ing3: "",
      ing4: "",
      ing5: "",
      ing6: "",
      ing7: "",
      ing8: "",
      recipeTitle: "",
      recipePhoto: "",
      errors: {}
    };
  }

  componentDidMount() {
    window.Materialize.toast("↓	 Share your recipe down here", 4000, "orange");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      }, ()=>{console.log(this.state.errors);
     });
    }
 
  }


  onChange = e => {
    switch (e.target.id) {
      case "recipePhoto":
        this.setState({ recipePhoto: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.id]: e.target.value, errors: {} });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const allingredients = [
      this.state.ing1,
      this.state.ing2,
      this.state.ing3,
      this.state.ing4,
      this.state.ing5,
      this.state.ing6,
      this.state.ing7,
      this.state.ing8
    ];
    let ingredients = [];
    for (let i = 0; i <= 8; i++) {
      if (allingredients[i]) {
        ingredients.push(allingredients[i]); //to send only inputed ingredients
      }
    }
    let formData = new FormData();

    formData.append("recipe", this.state.recipe);
    formData.append("postedBy", this.props.auth.user.id);
    formData.append("recipePhoto", this.state.recipePhoto);
    formData.append("ingredients", ingredients);
    formData.append("recipeTitle", this.state.recipeTitle);
    formData.append("servingNumber", this.state.servingNumber);
    formData.append("preparationTime", this.state.preparationTime);

    //console.log(this.state.errors);

    this.props.addRecipe(formData, this.props.history);
 
   if(!this.state.errors){                   


      //Reinitialize our form
      this.setState({
        recipe: "",
        errors:{},
        ing1: "",
        ing2: "",
        ing3: "",
        ing4: "",
        ing5: "",
        ing6: "",
        ing7: "",
        ing8: "",
        recipePhoto: "",
        recipeTitle: "",
        preparationTime: "00:00",
        servingNumber: "0"
      });
    }
      
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name}
              <p className="flow-text grey-text text-darken-1">
                This is a test page for adding recipes
              </p>
            </h4>
          </div>
        </div>
        {/*Add recipe*/}
        <form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
          {/*Insert Recipe title */}
          <div className="row">
            <div className="input-field col s12 l8">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="recipeTitle"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.recipeTitle}
                error={errors.recipeTitleEmpty}
                autoComplete="off"
                style={{ overflow: "hidden" }}
                type="text"
              />
              <label htmlFor="recipeTitle">Insert Recipe title</label>
              <span className="red-text">{errors.recipeTitleEmpty}</span>
            </div>
          </div>
          {/*preparation time and serving time */}

          <div className="row">
            <div className="col s12 l6 range-field grey-text">
              Insert needed time of preparation in minutes
              <input
                type="range"
                min="0"
                max="400"
                id="preparationTime"
                value={this.state.preparationTime}
                onChange={this.onChange}
              />
            </div>

            <div className="col s12 l6 range-field grey-text">
              Insert the number of served people
              <input
                type="range"
                min="1"
                max="12"
                id="servingNumber"
                value={this.state.servingNumber}
                onChange={this.onChange}
              />
            </div>
          </div>
          {/*End : Preparation & serving */}

          {/*Insert Recipe instructions}*/}
          <div className="row">
            <div className="input-field col s12 l8">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="recipe"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.recipe}
                error={errors.recipeEmpty}
                autoComplete="off"
                style={{ overflow: "hidden" }}
                type="text"
              />
              <label htmlFor="recipe">Insert Recipe instructions</label>
              <span className="red-text">{errors.recipeEmpty}</span>
            </div>
            <div className=" container input-field col s12 l4">
              <label>Input your picture</label>
              <div className="file-field input-field">
                <div className="btn">
                  <span>Browse</span>
                  <input
                    type="file"
                    onChange={this.onChange}
                    id="recipePhoto"
                  />
                </div>

                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="Recipe image here"
                  />
                </div>
              </div>
            </div>
          </div>
          {/**food ingredients 1*/}
          <div className="row">
            <div className="input-field col s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing1"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing1}
                error={errors.ingredientsError}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing1">Ingredient 1</label>
              <span className="red-text">{errors.ingredientsError}</span>
            </div>
            {/**food ingredients 2*/}
            <div className="input-field col s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing2"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing2}
                error={errors.ingredientsError}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing2">Ingredient 2</label>
              <span className="red-text">{errors.ingredientsError}</span>
            </div>
            {/**food ingredients 3*/}
            <div className="input-field col s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing3"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing3}
                error={errors.ingredientsError}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing3">Ingredient 3</label>
              <span className="red-text">{errors.ingredientsError}</span>
            </div>
            {/**food ingredients 4*/}
            <div className="input-field col  s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing4"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing4}
                error={errors.ingredientsError}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing4">Ingredient 4</label>
              <span className="red-text">{errors.ingredientsError}</span>
            </div>
            {/**food ingredients 5*/}
            <div className="input-field col  s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing5"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing5}
                //error={errors.recipeEmpty}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing5">Ingredient 5</label>
              {/* <span className="red-text">{errors.recipeEmpty}</span> */}
            </div>
            {/**food ingredients 6*/}
            <div className="input-field col s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing6"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing6}
                //error={errors.recipeEmpty}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing6">Ingredient 6</label>
              {/* <span className="red-text">{errors.recipeEmpty}</span> */}
            </div>
            {/**food ingredients 7*/}
            <div className="input-field col  s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing7"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing7}
                //error={errors.recipeEmpty}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing7">Ingredient 7</label>
              {/* <span className="red-text">{errors.recipeEmpty}</span> */}
            </div>
            {/**food ingredients 8*/}
            <div className="input-field col  s12 l3">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="ing8"
                className="materialize-textarea"
                onChange={this.onChange}
                value={this.state.ing8}
                //error={errors.recipeEmpty}
                autoComplete="off"
                style={{ overflow: "auto" }}
                type="text"
              />
              <label htmlFor="ing8">Ingredient 8</label>
              {/* <span className="red-text">{errors.recipeEmpty}</span> */}
            </div>
          </div>

          <br />
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            ADD
          </button>
        </form>
      </div>
    );
  }
}
RecipeComponent.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
 
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth:state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser, addRecipe }
)(RecipeComponent);
