import React from "react";
import PropTypes from "prop-types";

const Header = ({
  sampleSize,
  handleGenerate,
  handlereset,
  handleSampleSizeChanged
}) => (
  <div>
    <input
      type="number"
      min="0"
      max="100000"
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
