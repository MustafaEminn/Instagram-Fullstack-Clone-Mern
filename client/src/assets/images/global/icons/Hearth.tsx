import * as React from "react";

function HearthIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 21 19"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.305 2.943l.374.425.375-.425.61-.69c1.773-2.009 5.038-2.346 7.273-.726 1.06.768 1.51 1.947 1.559 3.193.048 1.254-.316 2.515-.811 3.339-2.766 4.6-4.898 6.909-9.018 10.304-2.186-1.654-3.77-2.861-5.126-4.215-1.409-1.406-2.58-2.98-3.897-5.388C.162 6.05.279 3.08 2.42 1.527c2.235-1.62 5.5-1.283 7.273.725l.61.691z"
        fill={props.color || "none"}
        stroke="#000"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default HearthIcon;
