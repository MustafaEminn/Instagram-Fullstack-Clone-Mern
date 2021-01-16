import React from "react";
import styles from "./Logo.module.scss";
import logo from "../../assets/images/components/Logo/logo.webp";

const Logo = () => {
  return <img src={logo} loading="lazy" className={styles.logo} />;
};

export default Logo;
