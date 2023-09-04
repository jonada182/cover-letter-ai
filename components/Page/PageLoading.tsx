import React from 'react'

type Props = {
    loading?: boolean
}

const PageLoading = (props: Props) => {
  return (
    <div className="px-6 py-4 rounded bg-blue-200 text-blue-800 mb-4">
      <p>{props.loading && 'Loading...'}</p>
    </div>
  )
}

export default PageLoading