import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

type Props = {
    name: string
    labelName?: string | undefined
    placeholder?: string | undefined
    value: string | number | readonly string[] | undefined
    handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea = (props: Props) => {
  return (
    <div className="flex flex-col max-w-lg justify-stretch mb-4">
      {props.labelName && <label className="font-semibold" htmlFor={props.name}>{props.labelName}</label>}
      <textarea
        className="flex-grow p-3 shadow-sm my-3 rounded h-36 max-h-36"
        name={props.name}
        id={props.name}
        placeholder={props?.placeholder}
        onChange={(e) => props.handleOnChange(e)}
        value={props.value ? props.value : ""}
      />
    </div>
  )
}

export default FormTextarea
