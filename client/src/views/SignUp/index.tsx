import React, { useState } from "react";
import Logo from "../../components/Logo";
import styles from "./SignUp.module.scss";
import googleplay from "../../assets/images/global/googleplay.webp";
import appstore from "../../assets/images/global/appstore.webp";
import facebookWhite from "../../assets/images/views/SignUp/icons/facebookWhite.webp";
import correct from "../../assets/images/global/icons/correct.svg";
import wrong from "../../assets/images/global/icons/wrong.svg";

import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import { checkString } from "../../utils/helpers";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailCheckDB, setEmailCheckDB] = useState(false);
  const [fullnameCheck, setFullnameCheck] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [usernameCheckDB, setUsernameCheckDB] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const route = useHistory();

  const buttonTrue =
    !emailCheck && usernameCheck && passwordCheck && fullnameCheck;

  const SignUpFetch = async () => {
    if (buttonTrue) {
      const post: any = postData(`${API_URL}/api/auth/register`, {
        username: username,
        fullname: name,
        email: email,
        password: password,
      });
      const res = await post;
      if (res.data.success) {
        setError(false);
        return route.push("/");
      } else {
        return setError(true);
      }
    }
  };

  const DBEmailCheck = async (e: string) => {
    const post: any = postData(`${API_URL}/api/auth/checkEmail`, {
      email: e,
    });
    const res = await post;
    !res.data.success ? setEmailCheckDB(false) : setEmailCheckDB(true);
  };

  const DBUsernameCheck = async (e: string) => {
    const post: any = postData(`${API_URL}/api/auth/checkUsername`, {
      username: e,
    });
    const res = await post;
    res.data.success ? setUsernameCheckDB(false) : setUsernameCheckDB(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.box1}>
          <Logo height="51" width="175" />
          <p className={styles.headText}>
            Sign up to see photos and videos from your friends.
          </p>
          <Link to="/hey">
            <button className={styles.loginFacebook}>
              <img src={facebookWhite} alt="Facebook Icon" />
              Log in with Facebook
            </button>
          </Link>

          <div className={styles.or}>
            <h5>OR</h5>
          </div>
          <label id={styles.emailLabel} className={styles.Label}>
            <input
              onChange={(e) => {
                setEmailCheck(
                  !checkString(e.target.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                );
                DBEmailCheck(e.target.value);
                setEmail(e.target.value);
              }}
              style={email.length > 0 ? { paddingTop: "14px" } : void 0}
              value={email}
              type="email"
              className={styles.Input}
            />
            <span
              style={
                email.length > 0 ? { top: "4px", fontSize: "10px" } : void 0
              }
            >
              Email
            </span>
            {email.length > 0 && (
              <img src={!emailCheck && !emailCheckDB ? correct : wrong} />
            )}
          </label>

          <label id={styles.Name} className={styles.Label}>
            <input
              onChange={(e) => {
                setFullnameCheck(e.target.value.length > 5);
                setName(e.target.value);
              }}
              style={name.length > 0 ? { paddingTop: "14px" } : void 0}
              value={name}
              type="text"
              className={styles.Input}
            />
            <span
              style={
                name.length > 0 ? { top: "4px", fontSize: "10px" } : void 0
              }
            >
              Full Name
            </span>
            {name.length > 0 && <img src={fullnameCheck ? correct : wrong} />}
          </label>

          <label id={styles.Username} className={styles.Label}>
            <input
              onChange={(e) => {
                setUsernameCheck(e.target.value.length > 5);
                setUsername(e.target.value);
                DBUsernameCheck(e.target.value);
              }}
              style={username.length > 0 ? { paddingTop: "14px" } : void 0}
              value={username}
              type="text"
              className={styles.Input}
            />
            <span
              style={
                username.length > 0 ? { top: "4px", fontSize: "10px" } : void 0
              }
            >
              Username
            </span>
            {username.length > 0 && (
              <img src={usernameCheck && usernameCheckDB ? correct : wrong} />
            )}
          </label>

          <label id={styles.passLabel} className={styles.Label}>
            <input
              onChange={(e) => {
                setPasswordCheck(e.target.value.length > 5);
                setPassword(e.target.value);
              }}
              style={password.length > 0 ? { paddingTop: "14px" } : void 0}
              value={password}
              type={show ? "text" : "password"}
              className={styles.Input}
            />
            <span
              style={
                password.length > 0 ? { top: "4px", fontSize: "10px" } : void 0
              }
            >
              Password
            </span>
            {password.length > 0 && (
              <img src={passwordCheck ? correct : wrong} />
            )}
            <button
              onClick={() => {
                setShow(!show);
              }}
              style={{
                display: password.length > 0 ? "inline-block" : "none",
              }}
              className={styles.inputButton}
            >
              {show ? "Hide" : "Show"}
            </button>
          </label>

          <button
            type="submit"
            disabled={buttonTrue ? false : true}
            className={styles.login}
            onClick={SignUpFetch}
          >
            Sign up
          </button>

          {error && (
            <h4 className={styles.error}>Ops! Something went wrong.</h4>
          )}

          <h4 className={styles.policy}>
            By signing up, you agree to our{" "}
            <Link to="/hey">Terms, Data Policy</Link> and{" "}
            <Link to="/hey">Cookies Policy.</Link>
          </h4>
        </div>
        <div className={styles.box2}>
          <p>
            Have an account?&nbsp;
            <Link className={styles.signup} to="/">
              Log in
            </Link>
          </p>
        </div>

        <p className={styles.getApp}>Get the app.</p>
        <div className={styles.box3}>
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
            <img
              src={appstore}
              className={styles.astore}
              alt="App Store"
              loading="lazy"
            />
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
            <img
              src={googleplay}
              className={styles.gplay}
              alt="Google Play"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
