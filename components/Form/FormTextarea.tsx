import React, { memo } from "react"

type Props = {
  name: string
  labelName?: string | undefined
  placeholder?: string | undefined
  value: string | number | readonly string[] | undefined
  large?: boolean
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea = (props: Props) => {
  return (
    <div className="flex flex-col max-w-lg justify-stretch mb-4">
      {props.labelName && <label className="font-semibold" htmlFor={props.name}>{props.labelName}</label>}
      <textarea
        className={`flex-grow p-3 transition-all shadow-sm my-3 rounded border-gray-200 focus:border-pink-600 outline-none ${props.large ? "h-64" : "h-36"} max-h-64`}
        name={props.name}
        id={props.name}
        placeholder={props?.placeholder}
        onChange={(e) => props.handleOnChange(e)}
        value={props.value ? props.value : ""}
      />
    </div>
  )
}

export default memo(FormTextarea)
