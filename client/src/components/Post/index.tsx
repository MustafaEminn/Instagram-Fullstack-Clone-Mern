import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BookmarkIcon from "../../assets/images/global/icons/Bookmark";
import HearthIcon from "../../assets/images/global/icons/Hearth";
import SendIcon from "../../assets/images/global/icons/Send";
import CartHeader from "../CartHeader";
import styles from "./Post.module.scss";
import { photoClickTrigger, postCommentTrigger as PCT } from "../../store/atom";
import CartPost from "../CartPost";
import moment from "moment";
import CommentPostIcon from "../../assets/images/global/icons/CommentPost";
import { Link } from "react-router-dom";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";

interface post {
  data: any;
  index: number;
}

const Post = ({ data, index }: post) => {
  const [showHearth, setShowHearth] = useState(false);
  const [comments, setComments] = useState(data.comments);
  const [commentsNumberPlus, setCommentsNumberPlus] = useState(0);
  const [viewAllComments, setViewAllComments] = useState(false);
  const [postCommentTrigger, setPostCommentTrigger] = useRecoilState(PCT);
  const [pct, setPct] = useRecoilState(photoClickTrigger);

  useEffect(() => {
    comments.reverse();
  }, [comments]);

  useEffect(() => {
    const getUser = async () => {
      if (postCommentTrigger.id === data._id) {
        let username = "";
        var promisePosts: any = postData(`${API_URL}/api/auth/getUser`);
        var user = await promisePosts;
        username = user?.data?.data?.username;
        let newComments = [
          {
            username: username,
            message: postCommentTrigger.message,
          },
          ...comments,
        ];
        setComments(newComments);
        setCommentsNumberPlus(commentsNumberPlus + 1);
      }
    };
    getUser();
  }, [postCommentTrigger]);
  return (
    <div className={styles.cart}>
      <CartHeader
        username={data.username}
        width="100%"
        height="60px"
        pageName={data.username}
        obId={data._id}
        maxWidth="614px"
      />
      <span
        onDoubleClick={() => {
          setPct(data._id);
          setShowHearth(true);
          setTimeout(() => {
            setShowHearth(false);
            setPct("");
          }, 1000);
        }}
        className={styles.imgContainer}
      >
        <HearthIcon
          display={showHearth ? "block" : "none"}
          className={styles.imgHearth}
          color="white"
          width={115}
          height={115}
          opacity={0.8}
        />
        <img
          className={styles.img}
          src={data.img}
          onDragStart={(e) => e.preventDefault()}
          alt="Post photo"
          loading="lazy"
        />
      </span>
      <div className={styles.cartInfo}>
        <div className={styles.cartIcons}>
          <div className={styles.CILeft}>
            <HearthIcon obId={data._id} width={24} height={24} index={index} />
            <Link to={`/posts/${data?._id}`}>
              <CommentPostIcon width={24} height={24} />
            </Link>
            <SendIcon width={24} height={24} />
          </div>
          <div className={styles.CIRight}>
            <BookmarkIcon obId={data._id} width={24} height={24} />
          </div>
        </div>
        <div className={styles.likes}>
          <p>{data.likesNumber}</p>&nbsp;
          {data.likesNumber < 2 ? "like" : "likes"}
        </div>
        <div className={styles.cartName}>
          {data.username}&nbsp;
          <p className={styles.cartNameContent}>{data.description}</p>
        </div>
        <div
          className={styles.comments}
          onClick={() => {
            setViewAllComments(!viewAllComments);
          }}
        >
          {comments[0] &&
            `View all ${data.commentsNumber + commentsNumberPlus} comments`}
        </div>

        {viewAllComments
          ? comments.map((item: any, index: number) => {
              return (
                <div className={styles.commentName}>
                  {item.username}&nbsp;
                  <p className={styles.commentContent}>{item.message}</p>
                </div>
              );
            })
          : comments.map((item: any, index: number) => {
              if (index < 5) {
                return (
                  <div className={styles.commentName}>
                    {item.username}&nbsp;
                    <p className={styles.commentContent}>{item.message}</p>
                  </div>
                );
              }
            })}

        <div className={styles.timeAgo}>{moment(data.createdAt).fromNow()}</div>
        <CartPost
          postInfo={{ name: data.username, obId: data._id }}
          index={index}
          width="100%"
          height="56px"
          maxWidth="614px"
        />
      </div>
    </div>
  );
};

export default Post;
