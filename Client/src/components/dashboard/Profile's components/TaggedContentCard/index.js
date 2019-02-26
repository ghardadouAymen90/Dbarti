import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecipe,getLikes } from "../../../../actions/recipeActions";
import Card from "./Card";
import CardContent from "./CardContent";
import CardOverlay from "./CardOverlay";
import "./styles.scss";

class TaggedContentCard extends React.Component {
  constructor(props) {
    super(props);
  }
  clicked = () => {
    this.props.getRecipe(this.props.recipe._id);
  };

  render() {
    let { recipePhoto, recipeTitle, servingNumber, _id } = this.props.recipe;
    return (
      <a
        className="card-link"
        href={`/recipe/${_id}`}
        onMouseEnter={this.clicked}
      >
        <Card className="tagged-content-card">
          <CardOverlay thumbnail={recipePhoto} />
          <CardContent
            thumbnail={recipePhoto}
            title={recipeTitle}
            description={servingNumber}
          />
        </Card>
      </a>
    );
  }
}
TaggedContentCard.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  getLikes: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  recipeSelected:PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth:state.auth,
  recipeSelected: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipe,getLikes }
)(TaggedContentCard);
