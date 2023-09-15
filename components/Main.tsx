"use client"
import { apiUrl, navigationLinks } from "@/constants"
import { usePathname } from "next/navigation"
import React from "react"
import { PageLogo, PageTemplate } from "./Page"
import Nav from "./Nav"
import { QueryClient, QueryClientProvider } from "react-query"
import { PageProvider } from "@/app/contexts/PageContext"
import { UserProvider } from "@/app/contexts/UserContext"
import axios from "axios"

axios.defaults.baseURL = apiUrl

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  }
})

const Main = ({ children }: Props) => {
  const pathname = usePathname()
  const currentNavigationLink = navigationLinks.find((link) => link.path === pathname)
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PageProvider>
          <main className="flex min-h-screen flex-col items-center justify-stretch">
            <header className="flex min-w-full flex-row items-center justify-between bg-pink-700">
              <PageLogo />
              <Nav currentNavigationLink={currentNavigationLink} />
            </header>
            <PageTemplate currentNavigationLink={currentNavigationLink}>
              {children}
            </PageTemplate>
          </main>
        </PageProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default Main
