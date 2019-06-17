import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";
import { sortableElement } from "react-sortable-hoc";

import styles from "./ListItem.module.scss";

const ListItem = ({ item, handleRemove, index }) => {
  return (
    <div className={styles.ListItem}>
      <div>
        <div>{item.get("content")}</div>
        <br />
        <div>
          <strong>Position on the generated batch: </strong>
          {item.get("localIndex")}
        </div>
      </div>
      <div className={styles.ItemRightSide}>
        <button
          className={styles.RemoveButton}
          onClick={() => handleRemove(index)}
        >
          X
        </button>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  handleRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default sortableElement(ListItem);
