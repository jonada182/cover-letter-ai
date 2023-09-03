import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

type Props = {
    type: HTMLInputTypeAttribute
    name: string
    labelName?: string | undefined
    placeholder?: string | undefined
    min?: number | undefined
    max?: number | undefined
    value: string | number | readonly string[] | undefined
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = (props: Props) => {
  return (
    <div className="flex flex-col max-w-sm justify-stretch mb-4">
      {props.labelName && <label className="font-semibold" htmlFor={props.name}>{props.labelName}</label>}
      <input
        className="flex-grow p-3 shadow-sm my-3 rounded"
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props?.placeholder}
        min={props?.min}
        max={props?.max}
        onChange={(e) => props.handleOnChange(e)}
        value={props.value}
      />
    </div>
  )
}

export default FormInput
