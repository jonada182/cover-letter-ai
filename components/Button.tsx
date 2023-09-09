import React from "react"

export enum ButtonColour {
  Green = "green",
  Yellow = "yellow",
  Red = "red",
  Default = "default"
}

type Props = {
  className?: string | ""
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  title?: string
  colour?: ButtonColour
  disabled?: boolean
}

const getButtonTheme = (colour: ButtonColour = ButtonColour.Default): string => {
  switch (colour) {
    case ButtonColour.Green:
      return "bg-green-500 text-white"
    case ButtonColour.Yellow:
      return "bg-yellow-500 text-white"
    case ButtonColour.Red:
      return "bg-red-500 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

const Button = (props: Props) => {

  return (
    <button
      disabled={!!props.disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 font-medium flex flex-grow-0 gap-2 items-center rounded transition-all hover:opacity-75 ${props.className || ""} ${getButtonTheme(props.colour)}`}
      onClick={props.onClick}
      title={props.title || ""}
    >
      {props.children}
    </button>
  )
}

export default Button
