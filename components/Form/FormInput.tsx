import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"

type Props = {
  type: HTMLInputTypeAttribute
  name: string
  labelName?: string | undefined
  placeholder?: string | undefined
  min?: number | undefined
  max?: number | undefined
  value: string | number | readonly string[] | undefined
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean | undefined
}

const FormInput = (props: Props) => {
  return (
    <div className="flex flex-col max-w-lg justify-stretch mb-4">
      {props.labelName && <label className="font-semibold flex justify-between" htmlFor={props.name}>
        {props.labelName}
        {props.required && <span className="text-xs text-pink-700 font-normal">Required</span>}
      </label>}
      <input
        className="flex-grow p-3 transition-all shadow-sm my-3 rounded border border-gray-200 focus:border-pink-600 outline-none"
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        onChange={(e) => props.handleOnChange(e)}
        value={props.value}
        required={props.required}
      />
    </div>
  )
}

export default FormInput
