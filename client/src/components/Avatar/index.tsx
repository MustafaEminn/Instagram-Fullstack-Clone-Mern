import React, { useState } from "react";
import styles from "./Avatar.module.scss";
import "./Avatar.scss";
import elon from "../../assets/images/global/elon.webp";

interface avatar {
  width: number;
  height: number;
  border?: boolean;
  borderHeight?: number;
  borderWidth?: number;
}

const Avatar = ({
  width,
  height,
  border,
  borderWidth,
  borderHeight,
}: avatar) => {
  const [avatarClick, setAvatarClick] = useState(true);

  const borderClick = () => {
    const borderElement = document.getElementById("borderDisable");
    if (borderElement && avatarClick) {
      borderElement.setAttribute("id", "borderActive");
      setTimeout(() => {
        setAvatarClick(false);
        borderElement.setAttribute("id", "borderDisable");
      }, 12000);
    }
  };
  return (
    <div style={{ width: width, height: height }} className={styles.container}>
      <img
        src={elon}
        width={width}
        height={height}
        alt="Avatar"
        loading="lazy"
      />
      <svg
        display={border && avatarClick ? "inline" : "none"}
        width={borderWidth}
        height={borderHeight}
        id="borderDisable"
        onClick={() => {
          borderClick();
        }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={50} cy={50} r={40} />
      </svg>
    </div>
  );
};

export default Avatar;
