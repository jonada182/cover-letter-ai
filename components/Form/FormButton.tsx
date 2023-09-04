import React from 'react'

type Props = {
    id?: string | undefined
    text: string
    disabled?: boolean
}

const FormButton = (props: Props) => {
  return (
    <button 
      type="submit" 
      className="disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-3 text-white bg-blue-700 font-semibold uppercase rounded hover:bg-pink-700 transition-all" 
      id={props?.id}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default FormButton
