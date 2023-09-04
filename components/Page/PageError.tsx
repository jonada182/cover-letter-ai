import React from 'react'

type Props = {
    error?: Error | null
}

const PageError = (props: Props) => {
  return (
    <div className="px-6 py-4 rounded bg-pink-200 text-pink-800 mb-4">
      <p><strong className="font-bold">Error: </strong>{props.error?.message}</p>
    </div>
  )
}

export default PageError