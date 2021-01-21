import * as React from "react";
import { postData } from "../../../../utils/API";
import { API_URL } from "../../../../utils/API_SETTINGS";

function BookmarkIcon(props: any) {
  const [bookmark, setBookmark] = React.useState("");
  const svgRef = React.useRef<any>();
  const toggleBookmark = async (id: string) => {
    postData(`${API_URL}/api/auth/toggleBookmark`, {
      id: id,
      username: localStorage.getItem("username"),
    });
  };
  const checkBookmark = async (id: string) => {
    const deneme = postData(`${API_URL}/api/auth/checkBookmark`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    const res = await deneme;
    return res?.data?.data ? setBookmark("#262626") : setBookmark("white");
  };

  React.useEffect(() => {
    if (svgRef.current) {
      checkBookmark(props.obId);
    } else {
      svgRef.current = true;
    }
  }, []);
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 17 21"
      fill={bookmark}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={svgRef}
      onClick={() => {
        if (props.obId) {
          toggleBookmark(props.obId);
          bookmark === "white" ? setBookmark("#262626") : setBookmark("white");
        }
      }}
    >
      <path
        d="M8.297 13.624l-7.17 6.274V.5h15v19.398l-7.171-6.274-.33-.288-.329.288z"
        stroke="#262626"
        fill={bookmark}
      />
    </svg>
  );
}

export default BookmarkIcon;
