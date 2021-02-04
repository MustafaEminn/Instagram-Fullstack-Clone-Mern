import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import styles from "./Home.module.scss";

import { API_URL } from "../../utils/API_SETTINGS";
import { postData, getData } from "../../utils/API";
import Modal from "../../components/Modal";
import Avatar from "../../components/Avatar";
import Spinner from "../../components/Spinner";
import Post from "../../components/Post";
import AuthMiddleware from "../../utils/AuthMiddleware";

const Home = () => {
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [addPostLoading, setAddPostLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<any>();
  const [data, setData] = useState<any>([]);
  const fileInputRef = useRef<any>();
  const contentInputRef = useRef<any>();

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = (error) => reject(error);
    });
    setFile(await reader);
  };

  const getPosts = async () => {
    var promisePosts: any = getData(`${API_URL}/api/posts/getAll`);
    var setPosts = await promisePosts;
    let data = setPosts?.data?.data;
    data?.reverse();
    setData(data);
    setLoadingPost(false);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAddPostLoading(true);
    e.preventDefault();
    const req = postData(`${API_URL}/api/posts/postsCreate`, {
      username: localStorage.getItem("username"),
      img: file,
      description: content,
    });
    const res = await req;
    if (res?.data?.success) {
      fileInputRef.current.value = "";
      contentInputRef.current.value = "";
      setVisible(false);
      getPosts();
      setAddPostLoading(false);
    } else {
      alert("Ops! Something went wrong.");
      setAddPostLoading(false);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      var promisePosts: any = getData(`${API_URL}/api/posts/getAll`);
      var setPosts = await promisePosts;
      let data = setPosts?.data?.data;
      data?.reverse();
      setData(data);
      setLoadingPost(false);
    };
    const getUser = async () => {
      var promisePosts: any = postData(`${API_URL}/api/auth/getUser`);
      var user = await promisePosts;
      setUser(user?.data?.data);
      setLoadingUser(false);
    };
    getPosts();
    getUser();
  }, []);

  return (
    <Layout>
      <AuthMiddleware onAuth={false} noAuth="/" />
      <div className={styles.container}>
        <div className={styles.box1}>
          <button className={styles.addPost} onClick={() => setVisible(true)}>
            Add Post
          </button>
          {loadingPost ? (
            <Spinner
              width="100%"
              height="100px"
              spinnerWidth="20px"
              spinnerHeight="20px"
            />
          ) : (
            data?.map((item: any, index: number) => {
              return <Post data={item} index={index} />;
            })
          )}
        </div>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHead}>
            <Avatar width={56} height={56} />
            <div className={styles.shDetail}>
              <p>{user?.username || ""}</p>
              <p>{user?.fullname || ""}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        width="50%"
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
                ref={fileInputRef}
                accept=".png,.jpg,.jpeg,.webp"
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
                ref={contentInputRef}
                type="text"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </label>

            <input
              disabled={addPostLoading ? true : false}
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
