"use client"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import axios from "axios"
import { apiUrl } from "@/constants"
import { PageTemplate } from "./Page"
import { PageProvider } from "@/contexts/PageContext"
import { UserProvider } from "@/contexts/UserContext"

axios.defaults.baseURL = apiUrl

type Props = {
  children: React.ReactNode
  loadingMessage: string
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 30 * 60 * 1000,
      staleTime: 15 * 60 * 1000
    }
  }
})

const Main = ({ children, loadingMessage }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <UserProvider>
          <PageTemplate loadingMessage={loadingMessage}>
            {children}
          </PageTemplate>
        </UserProvider>
      </PageProvider>
    </QueryClientProvider>
  )
}

export default Main
