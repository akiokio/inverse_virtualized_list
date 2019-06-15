import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";

const ListItem = ({ style, item }) => {
  return (
    <div style={{ ...style, border: "1px solid red" }}>
      <div>{item.get("content")}</div>
      <div>Created at: {item.get("createdAt").toLocaleTimeString("en-US")}</div>
      <div>Batch index: {item.get("localIndex")}</div>
    </div>
  );
};

ListItem.propTypes = {
  style: PropTypes.object,
  item: PropTypes.instanceOf(Map).isRequired
};

export default ListItem;
