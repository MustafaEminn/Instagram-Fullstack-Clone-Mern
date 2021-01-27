import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Spinner from "../../components/Spinner";
import Layout from "../../layout";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import AuthMiddleware from "../../utils/AuthMiddleware";
import styles from "./Profiles.module.scss";
import postsIcon from "../../assets/images/global/postsIcon.svg";
import HearthIcon from "../../assets/images/global/icons/Hearth";
import CommentIcon from "../../assets/images/global/icons/Comment";

const Profiles = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [profile, setProfile] = useState<string>();
  const [posts, setPosts] = useState<any>();
  const location = useLocation();
  const link = useHistory();

  const clickPost = (path: string) => {
    return link.push(`/posts/${path}`);
  };

  useEffect(() => {
    const getUser = async () => {
      var dataPromise = postData(`${API_URL}/api/auth/getUserOnUsername`, {
        username: location.pathname.split("/")[2],
      });
      var res = await dataPromise;
      if (res?.data?.data) {
        setData(res?.data?.data);
      } else {
        return link.push("/404");
      }
    };
    const getUserPosts = async () => {
      var dataPromise = postData(`${API_URL}/api/posts/getUserPost`, {
        username: location.pathname.split("/")[2],
      });
      var res = await dataPromise;
      if (res?.data?.data) {
        setPosts(res?.data?.data);
        setLoading(false);
        console.log(res.data);
      }
    };
    setProfile(location.pathname.split("/")[2]);
    getUser();
    getUserPosts();
  }, []);

  return (
    <div>
      <AuthMiddleware onAuth={false} noAuth="/" />
      {loading ? (
        <Spinner
          width="100%"
          height="100vh"
          spinnerWidth="25px"
          spinnerHeight="25px"
        />
      ) : (
        <Layout>
          <div className={styles.profileHead}>
            <Avatar
              width={150}
              height={150}
              border
              borderHeight={205}
              borderWidth={205}
              margin="0 101px 0 71px"
            />
            <div className={styles.headContent}>
              <div className={styles.hcBox1}>
                <h1>{profile}</h1>
                {profile === data.username ? (
                  <button className={styles.editProfile}>Edit Profile</button>
                ) : (
                  <button className={styles.follow}>Follow</button>
                )}
              </div>
              <div className={styles.hcBox2}>
                <h1 className={styles.hc2Content1}>
                  <span>{posts?.length}</span> posts
                </h1>
                <h1 className={styles.hc2Content2}>
                  <span>{data?.follows.length}</span> following
                </h1>
              </div>
              <div className={styles.hcBox3}>
                <h1>{data?.fullname}</h1>
              </div>
            </div>
          </div>

          <div className={styles.contentNavbar}>
            <button className={styles.cnBox1}>
              <img src={postsIcon} alt="Posts Icon" />
              &nbsp;Posts
            </button>
          </div>

          {new Array(+(posts?.length % 3) + +(posts?.length / 3).toFixed(0))
            .fill(0)
            .map((_, index) => {
              if (posts) {
                let imgIndex = index * 3;
                return (
                  <div className={styles.postsContainer}>
                    <div className={styles.postsSection}>
                      {posts[imgIndex] !== undefined ? (
                        <div
                          onClick={() => {
                            clickPost(posts[imgIndex]._id);
                          }}
                          className={styles.psContainer}
                        >
                          <img src={posts[imgIndex].img} alt="Posts" />
                          <div className={styles.psHoverBG}></div>
                          <div className={styles.psHover}>
                            <HearthIcon
                              width="19px"
                              height="19px"
                              color="white"
                            />
                            <p>{posts[imgIndex].likes.length}</p>
                            <CommentIcon
                              width="19px"
                              height="19px"
                              color="white"
                              fill="white"
                            />
                            <p>{posts[imgIndex].comments.length}</p>
                          </div>
                        </div>
                      ) : (
                        void 0
                      )}
                      {posts[imgIndex + 1] !== undefined ? (
                        <div
                          onClick={() => {
                            clickPost(posts[imgIndex + 1]._id);
                          }}
                          className={styles.psContainer}
                        >
                          <img src={posts[imgIndex + 1].img} alt="Posts" />
                          <div className={styles.psHoverBG}></div>
                          <div className={styles.psHover}>
                            <HearthIcon
                              width="19px"
                              height="19px"
                              color="white"
                            />
                            <p>{posts[imgIndex + 1].likes.length}</p>
                            <CommentIcon
                              width="19px"
                              height="19px"
                              color="white"
                              fill="white"
                            />
                            <p>{posts[imgIndex + 1].comments.length}</p>
                          </div>
                        </div>
                      ) : (
                        void 0
                      )}
                      {posts[imgIndex + 2] !== undefined ? (
                        <div
                          onClick={() => {
                            clickPost(posts[imgIndex + 2]._id);
                          }}
                          className={styles.psContainer}
                        >
                          <img src={posts[imgIndex + 2].img} alt="Posts" />
                          <div className={styles.psHoverBG}></div>
                          <div className={styles.psHover}>
                            <HearthIcon
                              width="19px"
                              height="19px"
                              color="white"
                            />
                            <p>{posts[imgIndex + 2].likes.length}</p>
                            <CommentIcon
                              width="19px"
                              height="19px"
                              color="white"
                              fill="white"
                            />
                            <p>{posts[imgIndex + 2].comments.length}</p>
                          </div>
                        </div>
                      ) : (
                        void 0
                      )}
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
        </Layout>
      )}
    </div>
  );
};

export default Profiles;
