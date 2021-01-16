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
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

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

  return (
    <div className={styles.container}>
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
          <Logo />
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
              Phone number, username or email
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
          >
            Log In
          </button>

          <div className={styles.or}>
            <span></span>
            <h5>OR</h5>
            <span></span>
          </div>

          <div className={styles.facebookLogin}>
            <img src={facebook} alt="Facebook Logo" loading="lazy" />
            Log in with Facebook
          </div>

          <Link to="/hey" className={styles.forgotPass}>
            Forgot password?
          </Link>
        </div>
        <div className={styles.box2}>
          <p>Don't have an account? Sign up</p>
        </div>

        <p className={styles.getApp}>Get the app.</p>
        <div className={styles.box3}>
          <img
            src={appstore}
            className={styles.astore}
            alt="App Store"
            loading="lazy"
          />
          <img
            src={googleplay}
            className={styles.gplay}
            alt="Google Play"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
