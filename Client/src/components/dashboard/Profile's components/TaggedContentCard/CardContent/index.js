import React from "react";

import "./styles.scss";

class CardContent extends React.Component {
  render() {
    let { thumbnail, title, description } = this.props;
    return (
      <div className="card-content">
        <div className="thumbnail">
          <img src={thumbnail} alt="recipe"/>
        </div>

        <div className="text">
          <div className="title">{title}</div>
          <div className="description">Recipe for {description} person(s)</div>

        </div>
      </div>
    );
  }
}

export default CardContent;
