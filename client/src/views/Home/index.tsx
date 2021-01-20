import React, { useState } from "react";
import CartHeader from "../../components/CartHeader";
import Layout from "../../layout";
import styles from "./Home.module.scss";

import simple1 from "../../assets/images/global/simple1.webp";
import simple2 from "../assets/images/global/simple2.webp";
import simple3 from "../assets/images/global/simple3.webp";
import HearthIcon from "../../assets/images/global/icons/Hearth";
import CommentIcon from "../../assets/images/global/icons/Comment";
import SendIcon from "../../assets/images/global/icons/Send";
import BookmarkIcon from "../../assets/images/global/icons/Bookmark";
import CartPost from "../../components/CartPost";
import { API_URL } from "../../utils/API_SETTINGS";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", "postsPhotos");
    formData.append("file", file);
    axios
      .post(`${API_URL}/api/posts/postsCreateImage`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <Layout>
      {new Array(3).fill(0).map((_, index) => {
        return (
          <div className={styles.cart}>
            <form
              onSubmit={(e) => {
                handleOnSubmit(e);
              }}
              encType="multipart/form-data"
              method="post"
            >
              <input
                type="file"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                name="postsPhotos"
              />
              <input type="submit" value="upload" />
            </form>
            <CartHeader width="614px" height="60px" pageName="Deneme" />
            <img className={styles.img} src={simple1} alt="Simple 1 Photo" />
            <div className={styles.cartInfo}>
              <div className={styles.cartIcons}>
                <div className={styles.CILeft}>
                  <HearthIcon width={24} height={24} />
                  <CommentIcon width={24} height={24} />
                  <SendIcon width={24} height={24} />
                </div>
                <div className={styles.CIRight}>
                  <BookmarkIcon width={24} height={24} />
                </div>
              </div>
              <div className={styles.likes}>
                {(Math.random() * 50).toFixed(3)} likes
              </div>
              <div className={styles.cartName}>
                elonmusk&nbsp;
                <p className={styles.cartNameContent}>ELON MUSK!</p>
              </div>
              <div className={styles.comments}>
                View all {(Math.random() * 50).toFixed(0)} comments
              </div>

              <div className={styles.commentName}>
                elonmusk&nbsp;
                <p className={styles.commentContent}>ELON!</p>
              </div>
              <div className={styles.commentName}>
                elonmusk&nbsp;
                <p className={styles.commentContent}>ELON!</p>
              </div>

              <div className={styles.timeAgo}>
                {(Math.random() * 10).toFixed(0)} hours ago
              </div>
              <CartPost width="614px" height="56px" />
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default Home;
