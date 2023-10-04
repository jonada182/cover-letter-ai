import React, { memo } from "react"
import Button, { ButtonColour } from "./Button"

type Props = {
  onClose: () => void
  onConfirm?: (event: React.MouseEvent | React.FormEvent) => void
  isOpen: boolean
  children: React.ReactNode
  title: string
}

const Modal = (props: Props) => {
  if (!props.isOpen) {
    return null
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal relative p-8 bg-white w-full mx-6 max-w-lg rounded shadow-lg gap-4 flex flex-col">
        <h2 className="text-xl font-semibold">{props.title}</h2>
        {props.children}
        <div className="flex items-center justify-end gap-4">
          <Button onClick={props.onClose} colour={ButtonColour.Red}>
            Close
          </Button>
          {props.onConfirm && (
            <Button onClick={props.onConfirm} colour={ButtonColour.Green}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
