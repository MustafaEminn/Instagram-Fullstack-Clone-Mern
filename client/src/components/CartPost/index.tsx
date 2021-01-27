import React, { useState } from "react";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import styles from "./CartPost.module.scss";
import { postCommentTrigger as PCT } from "../../store/atom";
import { useRecoilState } from "recoil";

interface cartpost {
  width: string;
  height: string;
  index: number;
  postInfo: { name: string; obId: string };
}

const CartPost = ({ width, height, index, postInfo }: cartpost) => {
  const [textValue, setTextValue] = useState("");
  const [postCommentTrigger, setPostCommentTrigger] = useRecoilState(PCT);
  const textareaChecker = () => {
    const taElement = document.getElementsByClassName(
      `cardPostTextarea${index}`
    )[0];
    const taElementId = document.getElementById(
      `cardPostTextarea${index}`
    ) as HTMLTextAreaElement;
    const cartPostElement = document.getElementById(
      `cartPostContainer${index}`
    ) as HTMLDivElement;
    if (
      taElement.scrollHeight > 22 &&
      taElementId.scrollHeight < 90 &&
      taElementId.textLength > 79
    ) {
      taElementId.style.height = "auto";
      taElementId.style.height = `${taElement.scrollHeight}px`;
      cartPostElement.style.height = `${taElement.scrollHeight}px`;
    } else if (taElementId.textLength < 79) {
      cartPostElement.style.height = "58px";
      taElementId.style.height = `18px`;
    }
  };

  const addComment = async () => {
    if (textValue.length >= 10) {
      let req = postData(
        `${API_URL}/api/posts/addComment`,
        JSON.stringify({ ...postInfo, message: textValue })
      );

      let res = await req;
      if (res.data.success) {
        setTextValue("");
        setPostCommentTrigger({
          id: postInfo.obId,
          username: postInfo.name,
          message: textValue,
        });
      }
    }
  };

  return (
    <div
      style={{ width: width, height: height, minHeight: height }}
      id={`cartPostContainer${index}`}
      className={styles.container}
    >
      <textarea
        onKeyPress={() => {
          textareaChecker();
        }}
        placeholder="Add a comment..."
        style={{
          height: "18px",
        }}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        id={`cardPostTextarea${index}`}
        className={`cardPostTextarea${index}`}
      ></textarea>
      <button
        disabled={textValue.length < 10 ? true : false}
        onClick={addComment}
      >
        Post
      </button>
    </div>
  );
};

export default CartPost;
