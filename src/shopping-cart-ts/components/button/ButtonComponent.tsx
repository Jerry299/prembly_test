import { FaSpinner } from "react-icons/fa6";

import "./app-button.css";
import React from "react";
import type { MouseEventHandler } from "react";

interface AppButtonProps {
  name: string | React.JSX.Element;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
  isBusy?: boolean;
  backgroundColor?: string;
  color?: string;
  icon?: string | React.JSX.Element;
  mobile?: boolean;
}

export default function AppButton({
  name,
  className,
  onClick,
  isActive,
  type,
  isBusy,
  color,
  backgroundColor,
  mobile,
}: AppButtonProps) {
  return (
    <button
      style={{
        color,
        backgroundColor: isActive ? backgroundColor : "#f17e83",
        height: `${mobile && "52px"}`,
      }}
      className={`app-button ${className || ""}`}
      onClick={isActive && !isBusy ? onClick : undefined}
      type={type || "button"}
    >
      {isBusy ? <FaSpinner /> : name}
    </button>
  );
}

// export function AppButtonWithIcon({
//   name,
//   className,
//   onClick,
//   isActive,
//   type,
//   isBusy,
//   color,
//   backgroundColor,
//   icon,
// }: AppButtonProps) {
//   return (
//     <button
//       style={{ color, backgroundColor: isActive ? backgroundColor : "#f17e83" }}
//       className={`app-button ${className || ""} ${
//         icon ? "d-flex j-center align-center" : ""
//       }`}
//       onClick={isActive && !isBusy ? onClick : undefined}
//       type={type || "button"}
//     >
//       {icon && icon}
//       {icon && <Spacer width={15} />}
//       {isBusy ? <FaSpinner /> : name}
//     </button>
//   );
// }
