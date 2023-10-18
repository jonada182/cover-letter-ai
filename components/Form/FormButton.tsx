import React, { ReactNode, memo } from "react";

type Props = {
  id?: string | undefined;
  text: string;
  disabled?: boolean;
  type?: "submit" | "button" | undefined;
  small?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
};

const FormButton = (props: Props) => (
  <button
    type={props.type ? props.type : "button"}
    className={`flex gap-2 items-center justify-center max-w-max disabled:bg-blue-400 disabled:cursor-not-allowed text-white bg-blue-700 font-medium uppercase rounded hover:bg-pink-700 transition-all ${
      props.small ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
    }`}
    id={props?.id}
    disabled={props.disabled}
    onClick={(e) => props.onClick && props.onClick(e)}
  >
    {props.icon && props.icon}
    {props.text}
  </button>
);

export default memo(FormButton);
