import React from "react"
import { PageError, PageHeading, PageLoading } from "."
import { NavigationLink } from "@/types"
import { usePageContext } from "@/app/contexts/PageContext"

type Props = {
  children: React.ReactNode
  currentNavigationLink: NavigationLink | undefined
}

const PageTemplate = ({ children, currentNavigationLink }: Props) => {
  const { loading: isPageLoading, error: isPageError } = usePageContext()
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

export default PageTemplate
