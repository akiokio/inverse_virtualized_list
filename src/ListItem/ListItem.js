import React from "react";
import PropTypes from "prop-types";
import { sortableElement } from "react-sortable-hoc";

import styles from "./ListItem.module.scss";

const ListItem = ({ handleRemove, index, content }) => (
  <div className={styles.ListItem}>
    <div>{content}</div>
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

ListItem.propTypes = {
  content: PropTypes.element.isRequired,
  handleRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default sortableElement(ListItem);
