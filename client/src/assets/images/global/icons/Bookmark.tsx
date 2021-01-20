import * as React from "react";

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 17 21"
      fill={props.color || "white"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.297 13.624l-7.17 6.274V.5h15v19.398l-7.171-6.274-.33-.288-.329.288z"
        stroke="black"
        fill={props.color}
      />
    </svg>
  );
}

export default BookmarkIcon;
