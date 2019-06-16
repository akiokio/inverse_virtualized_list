import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";

import styles from "./ListItem.module.scss";

const ListItem = ({ style, item }) => {
  return (
    <div style={style}>
      <div className={styles.ListItem}>
        <div>{item.get("content")}</div>
        <br />
        <div>
          <strong>Created at:</strong>{" "}
          {item.get("createdAt").toLocaleTimeString("en-US")}
        </div>
        <br />
        <div>
          <strong>Batch index:</strong> {item.get("localIndex")}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  style: PropTypes.object.isRequired,
  item: PropTypes.instanceOf(Map).isRequired
};

export default ListItem;
