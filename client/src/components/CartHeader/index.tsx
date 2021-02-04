import React from "react";
import { Link } from "react-router-dom";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";
import Avatar from "../Avatar";
import Modal from "../Modal";
import Spinner from "../Spinner";
import styles from "./CartHeader.module.scss";

interface cartHeader {
  pageName: string;
  height: string;
  width: string;
  username: string;
  obId: string;
  maxWidth?: string;
}

const CartHeader = ({
  pageName,
  height,
  width,
  username,
  obId,
  maxWidth,
}: cartHeader) => {
  const [followBool, setFollowBool] = React.useState<boolean>(true);
  const [visibleModal, setVisibleModal] = React.useState<boolean>();
  const [postAdmin, setPostAdmin] = React.useState<boolean>(true);
  const [modalLoading, setModalLoading] = React.useState<boolean>(true);

  const toggleFollow = async () => {
    const req = postData(`${API_URL}/api/auth/toggleFollow`, {
      usernamePost: username,
    });
    const res = await req;
    return res?.data?.data ? setFollowBool(!followBool) : void 0;
  };

  const checkFollow = async () => {
    const req = postData(`${API_URL}/api/auth/checkFollow`, {
      usernamePost: username,
    });
    const res = await req;
    return res?.data?.data ? setFollowBool(true) : setFollowBool(false);
  };

  const checkPostAdmin = async () => {
    const req = postData(`${API_URL}/api/posts/checkPostAdmin`, {
      postID: obId,
    });
    const res = await req;
    const resUnpromise = await res;
    setModalLoading(false);
    return resUnpromise?.data?.success
      ? setPostAdmin(true)
      : setPostAdmin(false);
  };

  const deletePost = async () => {
    const req = postData(`${API_URL}/api/posts/deletePost`, {
      id: obId,
    });
    const res = await req;
    return res.data.success
      ? (window.location.href = window.location.href)
      : alert("Oops. Try again!");
  };

  const dotsClick = () => {
    setVisibleModal(true);
    setModalLoading(true);
    checkPostAdmin();
  };

  React.useEffect(() => {
    checkFollow();
    checkPostAdmin();
  }, []);
  return (
    <div
      style={{ height: height, width: width, maxWidth: maxWidth }}
      className={styles.container}
    >
      <div className={styles.pageName}>
        <Avatar
          width={32}
          height={32}
          border
          borderWidth={46}
          borderHeight={46}
        />
        <Link to={`/profiles/${pageName}`}>{pageName}</Link>
        {!followBool && !postAdmin ? (
          <span>
            &nbsp;&bull;&nbsp;
            <span
              className={styles.followLink}
              onClick={() => {
                toggleFollow();
              }}
            >
              Follow
            </span>
          </span>
        ) : (
          void 0
        )}
      </div>
      <p onClick={dotsClick} className={styles.dots}>
        &bull;&bull;&bull;
      </p>

      <Modal
        width="400px"
        height="auto"
        visible={visibleModal}
        onClose={() => {
          setVisibleModal(false);
        }}
      >
        {modalLoading ? (
          <Spinner
            width="100%"
            height="100%"
            spinnerWidth="25px"
            spinnerHeight="25px"
          />
        ) : postAdmin ? (
          <ul className={styles.dotsModalContainer}>
            <li className={styles.delete} onClick={deletePost}>
              Delete
            </li>
            <li
              className={styles.close}
              onClick={() => {
                setVisibleModal(false);
              }}
            >
              Close
            </li>
          </ul>
        ) : (
          <ul className={styles.dotsModalContainer}>
            <li
              className={styles.close}
              onClick={() => {
                setVisibleModal(false);
              }}
            >
              Close
            </li>
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default CartHeader;
