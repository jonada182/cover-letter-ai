'use client'
import { navigationLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import React, { createContext } from 'react'
import { PageLogo, PageTemplate } from './Page'
import Nav from './Nav'
import { QueryClient, QueryClientProvider } from 'react-query'

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()
const Context = createContext({})

const Main = ({ children }: Props) => {
    const pathname = usePathname()
    const currentNavigationLink = navigationLinks.find((link) => link.path === pathname)
    return (
      <Context.Provider value="">
        <QueryClientProvider client={queryClient}>
          <main className="flex min-h-screen flex-col items-center justify-stretch">
            <header className="flex min-w-full flex-row items-center justify-between bg-pink-700">
              <PageLogo/>
              <Nav currentNavigationLink={currentNavigationLink}/>
            </header>
            <PageTemplate currentNavigationLink={currentNavigationLink}>
              {children}
            </PageTemplate>
          </main>
        </QueryClientProvider>
      </Context.Provider>
    )
}

export default Main