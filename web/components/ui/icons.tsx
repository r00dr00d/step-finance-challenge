import * as React from "react"


export const StakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 15a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H1a1 1 0 0 1-1-1Zm3.293-7.707a1 1 0 0 1 1.414 0L6 8.586V1a1 1 0 0 1 2 0v7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
)

export const UnstakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 15a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3.293 4.707a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L8 3.414V11a1 1 0 1 1-2 0V3.414L4.707 4.707a1 1 0 0 1-1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
)

export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 24 28"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22.741 14.469a1.6 1.6 0 0 1 0 2.262l-9.6 9.6a1.6 1.6 0 0 1-2.262 0l-9.6-9.6A1.6 1.6 0 1 1 3.54 14.47l6.869 6.869V2.8a1.6 1.6 0 1 1 3.2 0v18.538l6.869-6.869a1.6 1.6 0 0 1 2.262 0z"
      clipRule="evenodd"
    />
  </svg>
)