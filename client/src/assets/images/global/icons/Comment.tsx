import * as React from "react";

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="prefix__a" fill={props.color || "white"}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.665 14.996A9.954 9.954 0 0020 10c0-5.523-4.477-10-10-10S0 4.477 0 10s4.477 10 10 10a9.954 9.954 0 005.024-1.352l5.436 1.842-1.795-5.494z"
        />
      </mask>
      <path
        d="M18.665 14.996l-.866-.5-.224.386.14.425.95-.311zm-3.64 3.652l.32-.947-.43-.146-.394.229.503.864zm5.435 1.842l-.32.947 1.891.64-.62-1.898-.951.31zM19 10c0 1.64-.437 3.174-1.201 4.495l1.731 1.001A10.954 10.954 0 0021 10h-2zm-9-9a9 9 0 019 9h2c0-6.075-4.925-11-11-11v2zm-9 9a9 9 0 019-9v-2C3.925-1-1 3.925-1 10h2zm9 9a9 9 0 01-9-9h-2c0 6.075 4.925 11 11 11v-2zm4.521-1.216A8.953 8.953 0 0110 19v2c2.013 0 3.903-.542 5.528-1.488l-1.007-1.728zm6.26 1.759L15.345 17.7l-.641 1.894 5.435 1.842.642-1.894zm-3.067-4.236L19.51 20.8l1.9-.62-1.795-5.495-1.9.621z"
        fill="#000"
        mask="url(#prefix__a)"
      />
    </svg>
  );
}

export default CommentIcon;
