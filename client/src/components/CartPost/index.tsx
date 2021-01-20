import React, { useState } from "react";
import styles from "./CartPost.module.scss";

interface cartpost {
  width: string;
  height: string;
}

const CartPost = ({ width, height }: cartpost) => {
  const textareaChecker = () => {
    const taElement = document.getElementsByClassName("cardPostTextarea")[0];
    const taElementId = document.getElementById(
      "cardPostTextarea"
    ) as HTMLTextAreaElement;
    const cartPostElement = document.getElementById(
      "cartPostContainer"
    ) as HTMLDivElement;
    if (
      taElement.scrollHeight > 22 &&
      taElementId.scrollHeight < 90 &&
      taElementId.textLength > 79
    ) {
      taElementId.style.height = "auto";
      taElementId.style.height = `${taElement.scrollHeight}px`;
      cartPostElement.style.height = `${taElement.scrollHeight}px`;
    } else if (taElementId.textLength < 79) {
      cartPostElement.style.height = "58px";
      taElementId.style.height = `18px`;
    }
  };

  return (
    <div
      style={{ width: width, height: height, minHeight: height }}
      id="cartPostContainer"
      className={styles.container}
    >
      <textarea
        onKeyPress={() => {
          textareaChecker();
        }}
        placeholder="Add a comment..."
        style={{
          height: "18px",
        }}
        id="cardPostTextarea"
        className="cardPostTextarea"
      ></textarea>
      <button>Post</button>
    </div>
  );
};

export default CartPost;
