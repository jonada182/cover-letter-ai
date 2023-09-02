import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

type Props = {
    name: string,
    labelName?: string | undefined,
    placeholder?: string | undefined,
}

const FormTextarea = (props: Props) => {
  return (
    <div className="flex flex-col max-w-sm justify-stretch mb-4">
      {props.labelName && <label className="font-semibold" htmlFor={props.name}>{props.labelName}</label>}
      <textarea
        className="flex-grow p-3 shadow-sm my-3 rounded h-40 max-h-40"
        name={props.name}
        id={props.name}
        placeholder={props?.placeholder}
      />
    </div>
  )
}

export default FormTextarea
