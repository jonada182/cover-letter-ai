import React from "react"
import { FiEdit3 } from "react-icons/fi"

type Props = {
    loading?: boolean
}

const PageLoading = (props: Props) => {
  if (!props.loading) {
    return null
  }
  return (
    <div className="flex place-items-center gap-4 px-6 py-4 rounded bg-blue-200 text-blue-800 mb-4">
      <FiEdit3 className="text-4xl"/>
      <p>{props.loading && "... Please wait while we craft something unique"}</p>
    </div>
  )
}

export default PageLoading
