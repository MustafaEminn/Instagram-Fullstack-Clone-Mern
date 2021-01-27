import * as React from "react";

function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 128 128"
      {...props}
    >
      <g>
        <path
          d="M98.825 29.175a6.73 6.73 0 01.035 9.51L86.592 50.955a6.75 6.75 0 01-9.546-9.546L89.314 29.14a6.73 6.73 0 019.511.035z"
          fill="#bcbcbc"
          fillOpacity={0.26}
        />
        <path
          d="M113.25 64a6.73 6.73 0 01-6.7 6.75H89.2a6.75 6.75 0 010-13.5h17.35a6.73 6.73 0 016.7 6.75z"
          fill="#a7a7a7"
          fillOpacity={0.35}
        />
        <path
          d="M98.825 98.825a6.73 6.73 0 01-9.51.035L77.045 86.592a6.75 6.75 0 019.546-9.546L98.86 89.314a6.73 6.73 0 01-.035 9.511z"
          fill="#909090"
          fillOpacity={0.44}
        />
        <path
          d="M64 113.25a6.73 6.73 0 01-6.75-6.7V89.2a6.75 6.75 0 0113.5 0v17.35a6.73 6.73 0 01-6.75 6.7z"
          fill="#7a7a7a"
          fillOpacity={0.52}
        />
        <path
          d="M29.175 98.825a6.73 6.73 0 01-.035-9.51l12.268-12.269a6.75 6.75 0 019.546 9.546L38.686 98.86a6.73 6.73 0 01-9.511-.035z"
          fill="#646464"
          fillOpacity={0.61}
        />
        <path
          d="M14.75 64a6.73 6.73 0 016.7-6.75H38.8a6.75 6.75 0 010 13.5H21.45a6.73 6.73 0 01-6.7-6.75z"
          fill="#4e4e4e"
          fillOpacity={0.69}
        />
        <path
          d="M29.175 29.175a6.73 6.73 0 019.51-.035l12.269 12.268a6.75 6.75 0 01-9.546 9.546L29.14 38.686a6.73 6.73 0 01.035-9.511z"
          fill="#383838"
          fillOpacity={0.78}
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
          calcMode="discrete"
          dur="720ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

export default SpinnerIcon;
