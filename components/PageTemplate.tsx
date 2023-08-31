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
}

const navigationLinks: NavigationLink[] = [
  {
    path: "/",
    name: "Cover Letter",
  },
  {
    path: "/career-profile",
    name: "Career Profile",
  }
]

const PageTemplate = ({ children }: Props) => {
  const pathname = usePathname()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
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
                className={`p-6 ${isActive ? 'text-white' : 'text-pink-300'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </header>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {children}
      </div>
    </main>
  )
}

export default PageTemplate
