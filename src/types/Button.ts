import { IconType } from "react-icons";

export interface Button {
  nameButton: string | IconType;
  buttonType?: "submit" | "reset" | "button";
  textSize?: string;
  bgColor?: string;
  paddingY?: string;
  paddingX?: string;
  textColor?: string;
  hoverBgColor?: string;
  onClickButton?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}
