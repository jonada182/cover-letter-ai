import { navigationLinks } from "@/constants"
import { NavigationLink } from "@/types"
import Link from "next/link"
import React from "react"

type Props = {
  currentNavigationLink: NavigationLink | undefined
}

const Nav = ({ currentNavigationLink }: Props) => {
  return (
    <nav className="flex-grow flex flex-row items-center justify-end">
      {navigationLinks.map((link: NavigationLink) => {
        const isActive = currentNavigationLink?.path === link.path
        return (
          <Link
            key={link.name}
            href={link.path}
            className={`px-4 py-6 text-sm ${isActive ? "text-white" : "text-pink-300"}`}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
