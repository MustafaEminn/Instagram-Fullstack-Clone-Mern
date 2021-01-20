import React from "react";
import styles from "./Logo.module.scss";
import logo from "../../assets/images/components/Logo/logo.webp";

interface logo {
  width: string;
  height: string;
}

const Logo = ({ width, height }: logo) => {
  return (
    <img
      onDragStart={(e) => {
        e.preventDefault();
      }}
      width={width}
      height={height}
      src={logo}
      loading="lazy"
      className={styles.logo}
    />
  );
};

export default Logo;
