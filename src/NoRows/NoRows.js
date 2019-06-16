import React from "react";

import styles from "./NoRows.module.scss";

const NoRows = () => {
  return (
    <div className={styles.NoRowsWrapper}>
      Select the number of rows to start
    </div>
  );
};

export default NoRows;
