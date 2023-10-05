import React, { memo } from "react"
import { PageLogo } from "."
import Nav from "../Nav"
import { useUserContext } from "@/contexts/UserContext"
import { usePageContext } from "@/contexts/PageContext"

const PageHeader = () => {
  const { currentNavigationLink } = usePageContext()
  const { isLoggedIn } = useUserContext()
  if (!isLoggedIn) {
    return null
  }
  return (
    <header className="flex min-w-full flex-row items-center justify-between bg-blue-900">
      <PageLogo />
      <Nav currentNavigationLink={currentNavigationLink} />
    </header>
  )
}

export default memo(PageHeader)
