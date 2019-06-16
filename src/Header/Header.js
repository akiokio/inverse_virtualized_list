import React from "react";
import PropTypes from "prop-types";

import styles from "./Header.module.scss";

const Header = ({
  sampleSize,
  handleGenerate,
  handlereset,
  handleSampleSizeChanged
}) => (
  <div className={styles.Header}>
    <input
      className={styles.NumberOfRows}
      type="number"
      min="0"
      placeholder="# of items"
      onChange={handleSampleSizeChanged}
      value={sampleSize}
    />
    <button onClick={handleGenerate}>Generate</button>
    <button onClick={handlereset}>Reset</button>
  </div>
);

Header.propTypes = {
  sampleSize: PropTypes.string,
  handleGenerate: PropTypes.func.isRequired,
  handlereset: PropTypes.func.isRequired
};

export default Header;
