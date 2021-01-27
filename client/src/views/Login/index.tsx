import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import styles from "./Login.module.scss";
import facebook from "../../assets/images/components/Logo/icon/Facebook.webp";
import googleplay from "../../assets/images/global/googleplay.webp";
import appstore from "../../assets/images/global/appstore.webp";

import ss1 from "../../assets/images/global/telephoneScreenshots/1.webp";
import ss2 from "../../assets/images/global/telephoneScreenshots/2.webp";
import ss3 from "../../assets/images/global/telephoneScreenshots/3.webp";
import ss4 from "../../assets/images/global/telephoneScreenshots/4.webp";
import ss5 from "../../assets/images/global/telephoneScreenshots/5.webp";
import { Link, useHistory } from "react-router-dom";
import { getData, postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import AuthMiddleware from "../../utils/AuthMiddleware";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const route = useHistory();

  // SLIDER

  var slideIndex = 2;

  const Slider = setInterval(() => {
    var ssid = document.getElementsByClassName(
      `ss${slideIndex}`
    ) as HTMLCollectionOf<HTMLImageElement>;
    var ssidPrev = document.getElementsByClassName(
      `ss${slideIndex - 1}`
    ) as HTMLCollectionOf<HTMLImageElement>;
    if (slideIndex === 1) {
      ssidPrev = document.getElementsByClassName(
        `ss5`
      ) as HTMLCollectionOf<HTMLImageElement>;
    }
    if (window.location.pathname === "/") {
      ssidPrev[0].style.opacity = "0";
      ssid[0].style.opacity = "1";
      slideIndex === 5 ? (slideIndex = 1) : (slideIndex += 1);
    } else {
      clearInterval(Slider);
    }
  }, 6000);

  // AUTH

  const buttonTrue = email.length > 0 && password.length > 5;

  const LoginFetch = async () => {
    if (buttonTrue) {
      const post: any = postData(`${API_URL}/api/auth/login`, {
        email: email,
        password: password,
      });
      const res = await post;
      if (res.data.success) {
        const username = await getData(
          `${API_URL}/api/auth/getUsername/${email}`
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", await username.data.data.username);
        route.push("/home");
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <AuthMiddleware onAuth="/home" noAuth={false} />
      <div className={styles.container1}>
        <div
          className={styles.ImgBox}
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <img src={ss1} className="ss1" loading="lazy" alt="Screenshot" />
          <img src={ss2} className="ss2" loading="lazy" alt="Screenshot" />
          <img src={ss3} className="ss3" loading="lazy" alt="Screenshot" />
          <img src={ss4} className="ss4" loading="lazy" alt="Screenshot" />
          <img src={ss5} className="ss5" loading="lazy" alt="Screenshot" />
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.box1}>
          <Logo height="51" width="175" />
          <label id={styles.emailLabel} className={styles.Label}>
            <input
              onChange={(e) => {
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
          </label>

          <label id={styles.passLabel} className={styles.Label}>
            <input
              onChange={(e) => {
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
            <button
              onClick={() => {
                setShow(!show);
              }}
              style={{ display: password.length > 0 ? "inline-block" : "none" }}
              className={styles.inputButton}
            >
              {show ? "Hide" : "Show"}
            </button>
          </label>

          <button
            disabled={email.length > 0 && password.length >= 6 ? false : true}
            className={styles.login}
            onClick={LoginFetch}
          >
            Log In
          </button>
          {error && (
            <h4 className={styles.error}>Ops! Something went wrong.</h4>
          )}

          <div className={styles.or}>
            <h5>OR</h5>
          </div>

          <Link to="/hey" className={styles.facebookLogin}>
            <img src={facebook} alt="Facebook Logo" loading="lazy" />
            Log in with Facebook
          </Link>

          <Link to="/hey" className={styles.forgotPass}>
            Forgot password?
          </Link>
        </div>
        <div className={styles.box2}>
          <p>
            Don't have an account?&nbsp;
            <Link className={styles.signup} to="/signup">
              Sign up
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

export default Login;
