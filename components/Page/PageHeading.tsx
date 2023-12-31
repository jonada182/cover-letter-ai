import { NavigationLink } from "@/types"
import React, { memo } from "react"

type Props = {
  currentNavigationLink: NavigationLink | undefined
}

const PageHeading = ({ currentNavigationLink }: Props) => {
  if (!currentNavigationLink || currentNavigationLink?.isHidden) {
    return null
  }

  return (
    <div className="my-6">
      <h1 className="text-2xl text-blue-900">
        {currentNavigationLink?.name}
      </h1>
      <p className="text-sm font-light my-4 text-gray-500">
        {currentNavigationLink?.description}
      </p>
      <div className="w-6 h-1 bg-pink-700 opacity-50 my-4"></div>
    </div>
  )
}

export default memo(PageHeading)
