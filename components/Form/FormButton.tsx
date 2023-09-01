import React from 'react'

type Props = {
    id?: string | undefined,
    text: string,
}

const FormButton = (props: Props) => {
  return (
    <button className="px-6 py-3 text-white bg-pink-700 font-semibold uppercase rounded" id={props?.id}>{props.text}</button>
  )
}

export default FormButton
