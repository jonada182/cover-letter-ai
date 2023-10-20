import React, { memo } from "react"

type Props = {
  loading?: boolean
  message?: string
}

const PageLoading = (props: Props) => {
  if (props.loading) {
    return (
      <div className="flex place-items-center gap-4 px-6 py-4 text-gray-600 mb-4 animate-pulse">
        <p>{props.loading && props?.message ? props.message : "Loading..."}</p>
      </div>
    )
  }
}

export default memo(PageLoading)
