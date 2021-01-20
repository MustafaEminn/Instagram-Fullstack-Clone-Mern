import * as React from "react";

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.19 10.274V22h7.213v-7.213h4.122V22h7.213V10.274L10.464 1 1.19 10.274z"
        fill={props.color}
        stroke="#000"
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default HomeIcon;
