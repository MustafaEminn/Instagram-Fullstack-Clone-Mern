import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import Avatar from "../Avatar";
import styles from "./CartHeader.module.scss";

interface cartHeader {
  pageName: string;
  height: string;
  width: string;
  username: string;
}

const CartHeader = ({ pageName, height, width, username }: cartHeader) => {
  const [followBool, setFollowBool] = React.useState<boolean>();
  const toggleFollow = async () => {
    const req = postData(`${API_URL}/api/auth/toggleFollow`, {
      username: localStorage.getItem("username"),
      usernamePost: username,
    });
    const res = await req;
    return res.data.data ? setFollowBool(!followBool) : void 0;
  };
  const checkFollow = async () => {
    const req = postData(`${API_URL}/api/auth/checkFollow`, {
      usernamePost: username,
      username: localStorage.getItem("username"),
    });
    const res = await req;
    return res.data.data ? setFollowBool(true) : setFollowBool(false);
  };

  React.useEffect(() => {
    checkFollow();
  }, []);
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
        {!followBool && (
          <span>
            &nbsp;&bull;&nbsp;
            <span
              className={styles.followLink}
              onClick={() => {
                toggleFollow();
              }}
            >
              Follow
            </span>
          </span>
        )}
      </div>
      <p>&bull;&bull;&bull;</p>
    </div>
  );
};

export default CartHeader;
