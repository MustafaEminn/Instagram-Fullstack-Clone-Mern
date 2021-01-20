import * as React from "react";

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 23 20"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.297 1.723L9.5 7.905l2.11 8.863 8.688-15.045zM8.637 7.915l2.23 10.137.32 1.448.74-1.284L21.45 1.723l.959-1.66.108-.063H0l1.095 1 7.56 6.905-.017.01zM20 1L9 7 2.578 1H20z"
        fill="#000"
      />
    </svg>
  );
}

export default SendIcon;
