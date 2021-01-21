import * as React from "react";
import { postData } from "../../../../utils/API";
import { API_URL } from "../../../../utils/API_SETTINGS";

function HearthIcon(props: any) {
  const [like, setLike] = React.useState("");
  const svgRef = React.useRef<any>();
  const toggleLike = async (id: string) => {
    postData(`${API_URL}/api/posts/addLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    postData(`${API_URL}/api/auth/toggleLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
  };
  const checkLike = async (id: string) => {
    const deneme = postData(`${API_URL}/api/auth/checkLike`, {
      id: id,
      username: localStorage.getItem("username"),
    });
    const res = await deneme;
    return res.data.data ? setLike("#ED4956") : setLike("white");
  };

  React.useEffect(() => {
    if (svgRef.current) {
      checkLike(props.obId);
    } else {
      svgRef.current = true;
    }
  }, []);
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 21 19"
      fill={like}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      onClick={() => {
        if (props.obId) {
          toggleLike(props.obId);
          like === "white" ? setLike("#ED4956") : setLike("white");
        }
      }}
    >
      <path
        d="M10.305 2.943l.374.425.375-.425.61-.69c1.773-2.009 5.038-2.346 7.273-.726 1.06.768 1.51 1.947 1.559 3.193.048 1.254-.316 2.515-.811 3.339-2.766 4.6-4.898 6.909-9.018 10.304-2.186-1.654-3.77-2.861-5.126-4.215-1.409-1.406-2.58-2.98-3.897-5.388C.162 6.05.279 3.08 2.42 1.527c2.235-1.62 5.5-1.283 7.273.725l.61.691z"
        fill={like}
        stroke={like === "white" ? "#000" : "#ED4956"}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default HearthIcon;
