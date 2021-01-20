import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

interface modal {
  width: string;
  height: string;
  visible: boolean;
  children: any;
  onClose: () => void;
}

const Modal = ({ width, height, children, visible, onClose }: modal) => {
  return (
    <div
      className={styles.container}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div
        onClick={() => {
          onClose();
        }}
        className={styles.modalBackground}
      ></div>
      <div className={styles.modal} style={{ width: width, height: height }}>
        <div className={styles.modalHeader}>
          <p
            onClick={() => {
              onClose();
            }}
          >
            X
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
