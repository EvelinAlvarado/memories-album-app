import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  nameButton: string | IconType;
  buttonType?: "submit" | "reset" | "button";
  textSize?: string;
  bgColor?: string;
  paddingY?: string;
  textColor?: string;
  hoverBgColor?: string;
  onClickButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonCustom = ({
  nameButton,
  buttonType = "button",
  textSize = "text-[22px]",
  bgColor = "bg-black",
  paddingY = "py-2.5",
  textColor = "text-white",
  hoverBgColor = "bg-black/80",
  onClickButton,
}: ButtonProps) => {
  return (
    <button
      type={buttonType}
      onClick={onClickButton}
      className={`w-full items-center justify-center rounded-2xl ${bgColor} px-3.5 ${paddingY} ${textSize} font-light leading-7 ${textColor} hover:${hoverBgColor} active:scale-95 font-light w-max`}
    >
      {typeof nameButton === "string"
        ? nameButton
        : React.createElement(nameButton)}
    </button>
  );
};
