import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import styles from "./CartHeader.module.scss";

interface cartHeader {
  pageName: string;
  height: string;
  width: string;
}

const CartHeader = ({ pageName, height, width }: cartHeader) => {
  return (
    <div style={{ height: height, width: width }} className={styles.container}>
      <div className={styles.pageName}>
        <Avatar
          width={32}
          height={32}
          border
          borderWidth={46}
          borderHeight={46}
        />
        <Link to={`profiles/${pageName}`}>{pageName}</Link>
        &nbsp;&bull;&nbsp;
        <Link to={`profiles/${pageName}`}>Follow</Link>
      </div>
      <p>&bull;&bull;&bull;</p>
    </div>
  );
};

export default CartHeader;
