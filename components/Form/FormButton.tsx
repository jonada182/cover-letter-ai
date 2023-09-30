import React, { memo } from "react"

type Props = {
  id?: string | undefined
  text: string
  disabled?: boolean
  type?: "submit" | "button" | undefined
  small?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FormButton = (props: Props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`max-w-max disabled:bg-blue-400 disabled:cursor-not-allowed text-white bg-blue-700 font-semibold uppercase rounded hover:bg-pink-700 transition-all ${props.small ? "px-4 py-2 text-xs" : "px-6 py-3"}`}
      id={props?.id}
      disabled={props.disabled}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {props.text}
    </button>
  )
}

export default memo(FormButton)
