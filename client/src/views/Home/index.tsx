import React, { useEffect, useState } from "react";
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
import { postData, getData } from "../../utils/API";
import Modal from "../../components/Modal";
import moment from "moment";

const Home = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [likeCheck, setLikeCheck] = useState(false);
  const [data, setData] = useState<any>([]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reader = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
    postData(`${API_URL}/api/posts/postsCreate`, {
      username: localStorage.getItem("username"),
      img: await reader,
      description: content,
    });
  };

  const toggleLike = async (id: string) => {
    postData(`${API_URL}/api/posts/addLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    const deneme = postData(`${API_URL}/api/auth/addLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    console.log(await deneme);
  };
  const checkLike = async (id: string) => {
    const deneme = postData(`${API_URL}/api/auth/checkLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    const res = await deneme;
    return res.data.data;
  };

  useEffect(() => {
    const getPosts = async () => {
      var promisePosts: any = getData(`${API_URL}/api/posts/getAll`);
      var setPosts = await promisePosts;
      setData(setPosts?.data?.data);
    };
    getPosts();
  }, []);

  return (
    <Layout>
      <img src="data:image/png;base64,base64code" alt="" />
      <button className={styles.addPost} onClick={() => setVisible(true)}>
        Add Post
      </button>
      {data?.map((item: any, index: number) => {
        return (
          <div className={styles.cart}>
            <CartHeader width="614px" height="60px" pageName={item.username} />
            <img className={styles.img} src={item.img} alt="Simple 1 Photo" />
            <div className={styles.cartInfo}>
              <div className={styles.cartIcons}>
                <div className={styles.CILeft}>
                  <HearthIcon
                    onClick={() => {
                      toggleLike(item._id);
                    }}
                    width={24}
                    height={24}
                  />
                  <CommentIcon width={24} height={24} />
                  <SendIcon width={24} height={24} />
                </div>
                <div className={styles.CIRight}>
                  <BookmarkIcon width={24} height={24} />
                </div>
              </div>
              <div className={styles.likes}>
                {item.likes > 0 && `${item.likes} likes`}
              </div>
              <div className={styles.cartName}>
                {item.username}&nbsp;
                <p className={styles.cartNameContent}>{item.description}</p>
              </div>
              <div className={styles.comments}>
                {item.comments[0] &&
                  `View all ${item.comments.length + 1} comments`}
              </div>

              <div className={styles.commentName}>
                elonmusk&nbsp;
                <p className={styles.commentContent}>ELON!</p>
              </div>

              <div className={styles.timeAgo}>
                {moment(item.createdAt).fromNow()}
              </div>
              <CartPost index={index} width="614px" height="56px" />
            </div>
          </div>
        );
      })}

      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        width="500px"
        height="200px"
      >
        <div className={styles.modal}>
          <form
            onSubmit={(e) => {
              handleOnSubmit(e);
            }}
          >
            <label>
              Photo:&nbsp;
              <input
                className={styles.fileInput}
                type="file"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </label>
            <label>
              Content:&nbsp;
              <input
                className={styles.textInput}
                type="text"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </label>

            <input
              className={styles.submitInput}
              type="submit"
              value="Create Post"
            />
          </form>
        </div>
      </Modal>
    </Layout>
  );
};

export default Home;
