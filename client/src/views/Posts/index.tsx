import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Posts.module.scss";
import Spinner from "../../components/Spinner";
import Layout from "../../layout";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import CartHeader from "../../components/CartHeader";
import HearthIcon from "../../assets/images/global/icons/Hearth";
import CommentPostIcon from "../../assets/images/global/icons/CommentPost";
import SendIcon from "../../assets/images/global/icons/Send";
import BookmarkIcon from "../../assets/images/global/icons/Bookmark";
import moment from "moment";
import CartPost from "../../components/CartPost";
import Avatar from "../../components/Avatar";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const location = useLocation();
  const link = useHistory();
  useEffect(() => {
    const getPost = async () => {
      var dataPromise = postData(`${API_URL}/api/posts/getPostOnId`, {
        id: location.pathname.split("/")[2],
      });
      var res = await dataPromise;
      if (res?.data?.data) {
        setData(res?.data?.data);
        setLoading(false);
        console.log(res.data.data);
      } else {
        return link.push("/404");
      }
    };

    const getUser = async () => {
      var dataPromise = postData(`${API_URL}/api/auth/getUser`);
      var res = await dataPromise;
      if (res?.data?.data) {
        setProfile(res?.data?.data);
      }
    };
    getPost();
    getUser();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner
          width="100vw"
          height="100vh"
          spinnerHeight="25px"
          spinnerWidth="25px"
        />
      ) : (
        <Layout>
          <div className={styles.container}>
            <div className={styles.postsContainer}>
              <div className={styles.postsImage}>
                <div className={styles.responsiveHeader}>
                  {/* Responsive mobile */}
                  <CartHeader
                    pageName={data?.username}
                    username={data?.username}
                    obId={data?._id}
                    width="100%"
                    height="60px"
                  />
                </div>
                <img src={data?.img} alt="Image" />
                <div className={styles.responsiveFooter}>
                  <div className={styles.icons}>
                    <div className={styles.iconsBox1}>
                      <HearthIcon
                        obId={data?._id}
                        width={24}
                        height={24}
                        index={0}
                        postPageResponsive={true}
                      />
                      <CommentPostIcon width={24} height={24} />
                      <SendIcon width={24} height={24} />
                    </div>
                    <div className={styles.iconsBox2}>
                      <BookmarkIcon obId={data?._id} width={24} height={24} />
                    </div>
                  </div>
                  <h1 className={styles.likeCount}>
                    <span>{data?.likesNumber}</span> likes
                  </h1>
                  <div className={styles.timeAgo}>
                    {moment(data?.createdAt).fromNow()}
                  </div>
                </div>
              </div>
              <div className={styles.postsDetails}>
                <CartHeader
                  pageName={data?.username}
                  username={data?.username}
                  obId={data?._id}
                  width="100%"
                  height="96px"
                />
                <div className={styles.pdContent}>
                  <div className={styles.pdcHead}>
                    <Avatar width={32} height={32} />
                    <p>{data?.username}</p>
                    <p>{data?.description}</p>
                  </div>
                  {data.comments?.map((item: any) => {
                    return (
                      <div className={styles.pdcComment}>
                        <Avatar width={32} height={32} />
                        <p>
                          <span>{item.username}</span>&nbsp;
                          {item.message}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div className={styles.icons}>
                    <div className={styles.iconsBox1}>
                      <HearthIcon
                        obId={data?._id}
                        width={24}
                        height={24}
                        index={1}
                        postPage={true}
                      />
                      <CommentPostIcon width={24} height={24} />
                      <SendIcon width={24} height={24} />
                    </div>
                    <div className={styles.iconsBox2}>
                      <BookmarkIcon obId={data?._id} width={24} height={24} />
                    </div>
                  </div>
                  <h1 className={styles.likeCount}>
                    <span>{data?.likesNumber}</span> likes
                  </h1>
                  <div className={styles.timeAgo}>
                    {moment(data?.createdAt).fromNow()}
                  </div>
                  <CartPost
                    width="100%"
                    height="56px"
                    index={0}
                    postInfo={{ name: profile?.username, obId: data?._id }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Posts;
