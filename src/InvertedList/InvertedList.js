import React, { Component } from "react";
import PropTypes from "prop-types";

class InvertedList extends Component {
  static propTypes = {
    listItems: PropTypes.array.isRequired
  };

  render() {
    const { listItems } = this.props;
    return (
      <div>
        {listItems.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }
}

export default InvertedList;
