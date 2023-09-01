'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

type NavigationLink = {
  path: string;
  name: string;
  description: string | ""
}

const navigationLinks: NavigationLink[] = [
  {
    path: "/",
    name: "Cover Letter",
    description: "Generate professional cover letters by providing all the details about your next job opportunity",
  },
  {
    path: "/career-profile",
    name: "Career Profile",
    description: "Get better results from cover letters by adding information about your career",
  }
]

const PageTemplate = ({ children }: Props) => {
  const pathname = usePathname()
  const currentNavigationLink = navigationLinks.find((link) => link.path === pathname)
  return (
    <main className="flex min-h-screen flex-col items-center justify-stretch">
      <header className="flex min-w-full flex-row items-center justify-between bg-pink-700">
        <div className="flex-grow-0 bg-blue-900 text-white rounded-r-full pr-6">
          <h4 className="p-6 font-bold">CoverLetterAI</h4>
        </div>
        <nav className="flex-grow flex flex-row items-center justify-end">
          {navigationLinks.map((link: NavigationLink) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`p-6 text-sm ${isActive ? 'text-white' : 'text-pink-300'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </header>
      <div className="flex min-h-screen flex-col justify-stretch z-10 max-w-5xl w-full p-6">
        <div className="my-8">
          <h1 className="text-2xl text-blue-900">
            {currentNavigationLink?.name}
          </h1>
          <p className="text-xs my-4 text-gray-500">
            {currentNavigationLink?.description}
          </p>
          <div className="w-6 h-1 bg-pink-700 opacity-50 my-4"></div>
        </div>
        <div className="flex flex-col text-sm">
          {children}
        </div>
      </div>
    </main>
  )
}

export default PageTemplate
