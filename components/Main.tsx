"use client"
import { apiUrl, navigationLinks } from "@/constants"
import { usePathname } from "next/navigation"
import React, { Suspense } from "react"
import { PageHeader, PageLoading, PageTemplate } from "./Page"
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
      cacheTime: 300
    }
  }
})

const Main = ({ children }: Props) => {
  const pathname = usePathname()
  const currentNavigationLink = navigationLinks.find((link) => link.path === pathname)
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <UserProvider>
          <main className="flex min-h-screen flex-col items-center justify-stretch">
            <PageHeader currentNavigationLink={currentNavigationLink} />
            <Suspense fallback={<PageLoading loading={true} />}>
              <PageTemplate currentNavigationLink={currentNavigationLink}>
                {children}
              </PageTemplate>
            </Suspense>
          </main>
        </UserProvider>
      </PageProvider>
    </QueryClientProvider>
  )
}

export default Main
