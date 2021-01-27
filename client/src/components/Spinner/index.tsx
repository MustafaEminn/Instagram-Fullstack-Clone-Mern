import React from "react";
import SpinnerIcon from "../../assets/images/global/Spinner";
import styles from "./Spinner.module.scss";

interface spinner {
  width: string;
  height: string;
  spinnerWidth: string;
  spinnerHeight: string;
}

const Spinner = ({ width, height, spinnerHeight, spinnerWidth }: spinner) => {
  return (
    <div className={styles.container} style={{ width: width, height: height }}>
      <SpinnerIcon width={spinnerWidth} height={spinnerHeight} />
    </div>
  );
};

export default Spinner;
