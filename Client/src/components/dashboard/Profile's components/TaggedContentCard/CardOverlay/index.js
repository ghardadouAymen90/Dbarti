import React from "react";

import "./styles.scss";

class CardOverlay extends React.Component {
  render() {
    let { thumbnail } = this.props;
    thumbnail = !thumbnail ? "" : thumbnail.split("\\").join("/");
    return (
      <div className="card-overlay">
        <div
          className="overlay"
          style={{
            backgroundImage: "url(" + thumbnail + ")"
          }}
        />
      </div>
    );
  }
}

export default CardOverlay;
