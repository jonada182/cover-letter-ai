import React, { memo } from "react"
import { PageError, PageHeading, PageLoading } from "."
import { NavigationLink } from "@/types"
import { usePageContext } from "@/contexts/PageContext"
import { useUserContext } from "@/contexts/UserContext"

type Props = {
  children: React.ReactNode
  currentNavigationLink: NavigationLink | undefined
}

const PageTemplate = ({ children, currentNavigationLink }: Props) => {
  const { loading: isPageLoading, error: isPageError } = usePageContext()
  const { isLoggedIn } = useUserContext()

  if (!isLoggedIn && currentNavigationLink?.path !== "/login") {
    return null
  }

  return (
    <div className="flex flex-col content-center justify-center flex-grow z-10 max-w-5xl w-full p-6">
      <PageHeading currentNavigationLink={currentNavigationLink} />
      <PageError error={isPageError} />
      <PageLoading loading={isPageLoading} />
      <div className="flex flex-col text-sm justify-center h-full">
        {children}
      </div>
    </div>
  )
}

export default memo(PageTemplate)
