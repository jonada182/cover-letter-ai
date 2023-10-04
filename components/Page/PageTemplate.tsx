import React, { memo } from "react"
import Image from "next/image"
import { PageError, PageHeading, PageLoading } from "."
import { NavigationLink } from "@/types"
import { usePageContext } from "@/contexts/PageContext"
import { useUserContext } from "@/contexts/UserContext"
import Background from "@/public/img/background.jpg"

type Props = {
  children: React.ReactNode
  currentNavigationLink: NavigationLink | undefined
}

const PageTemplate = ({ children, currentNavigationLink }: Props) => {
  const { loading: isPageLoading, error: isPageError, centerPage, backgroundImage } = usePageContext()
  const { isLoggedIn } = useUserContext()

  return (
    <>
      <div className={`flex flex-col content-center ${ centerPage ? "justify-center" : "justify-stretch"} flex-grow z-10 max-w-5xl w-full p-6`}>
        <PageError error={isPageError} />
        <PageLoading loading={isPageLoading} />
        { isLoggedIn && currentNavigationLink?.path !== "/login" && (
          <>
            <PageHeading currentNavigationLink={currentNavigationLink} />
            <div className="flex flex-col text-sm justify-center h-full">
              {children}
            </div>
          </>
        )}
      </div>
      { backgroundImage && <Image src={Background} alt="" className="object-cover -z-0 object-center" fill={true} />}
    </>
  )
}

export default memo(PageTemplate)
