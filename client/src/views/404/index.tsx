import React from "react";
import styles from "./Error404.module.scss";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404"
      />
    </div>
  );
};

export default Error404;
