import { APIError } from "@/types"
import React from 'react'

type Props = {
    error?: Error | APIError | null
}

const ErrorMessage = ({ error }: Props) => {
  return <p><strong className="font-bold">Error: </strong>{error?.message}</p>
}

const PageError = (props: Props) => {
  if (!props.error) {
    return null
  }

  return (
    <div className="px-6 py-4 rounded bg-pink-200 text-pink-800 mb-4">
      <ErrorMessage error={props.error}/>
    </div>
  )
}

export default PageError