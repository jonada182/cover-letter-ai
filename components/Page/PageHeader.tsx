import React from "react"
import { PageLogo } from "."
import Nav from "../Nav"
import { NavigationLink } from "@/types"
import { useUserContext } from "@/app/contexts/UserContext"

type Props = {
  currentNavigationLink: NavigationLink | undefined
}

const PageHeader = (props: Props) => {
  const { isLoggedIn } = useUserContext()
  if (!isLoggedIn) {
    return null
  }
  return (
    <header className="flex min-w-full flex-row items-center justify-between bg-pink-700">
      <PageLogo />
      <Nav currentNavigationLink={props.currentNavigationLink} />
    </header>
  )
}

export default PageHeader
