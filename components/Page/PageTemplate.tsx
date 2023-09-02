import React from 'react'
import { PageHeading } from '.'
import { NavigationLink } from '@/types'

type Props = {
    children: React.ReactNode
    currentNavigationLink: NavigationLink | undefined
}

const PageTemplate = ({ children, currentNavigationLink }: Props) => {
  return (
    <div className="flex min-h-screen flex-col justify-stretch z-10 max-w-5xl w-full p-6">
      <PageHeading currentNavigationLink={currentNavigationLink}/>
      <div className="flex flex-col text-sm">
        {children}
      </div>
    </div>
  )
}

export default PageTemplate
