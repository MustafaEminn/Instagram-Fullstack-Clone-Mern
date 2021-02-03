import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import styles from "./Layout.module.scss";

import search from "../assets/images/global/icons/search.svg";
import cancel from "../assets/images/global/icons/cancel.svg";
import HomeIcon from "../assets/images/global/icons/Home";
import SendIcon from "../assets/images/global/icons/Send";
import ExploreIcon from "../assets/images/global/icons/Explore";
import HearthIcon from "../assets/images/global/icons/Hearth";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";
import { postData } from "../utils/API";
import { API_URL } from "../utils/API_SETTINGS";

const Layout = ({ children }: any) => {
  const path = window.location.pathname;

  const [inputValue, setInputValue] = useState("");
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      var dataPromise = postData(`${API_URL}/api/auth/getUser`);
      var res = await dataPromise;
      if (res?.data?.data) {
        setProfile(res?.data?.data);
      }
    };
    getUser();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.boxHeader}>
          <div className={styles.box1}>
            <Link to="/home">
              <Logo height="29" width="103" />
            </Link>
          </div>
          <div className={styles.box2}>
            <label>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search"
                type="text"
              />
              <img
                width="10"
                height="10"
                src={search}
                alt="Search"
                loading="lazy"
                className={styles.searchIcon1}
                style={{
                  display: inputValue.length > 0 ? "none" : "inline-block",
                }}
              />
              <img
                width="15"
                height="15"
                src={cancel}
                alt="Cancel"
                loading="lazy"
                className={styles.searchIcon2}
                onClick={() => {
                  setInputValue("");
                }}
                style={{
                  display: inputValue.length > 0 ? "inline-block" : "none",
                }}
              />
            </label>
          </div>

          <div className={styles.box3}>
            <HomeIcon color={path === "/home" ? "black" : void 0} />
            <SendIcon
              width={22}
              height={22}
              color={path === "/message" ? "black" : void 0}
            />
            <ExploreIcon color={path === "/explore" ? "black" : void 0} />
            <HearthIcon
              width={22}
              height={22}
              color={path === "/notifications" ? "black" : void 0}
            />
            <Link to={`/profiles/${profile?.username}`}>
              <Avatar width={22} height={22} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.containerContent}>{children}</div>
    </div>
  );
};

export default Layout;
