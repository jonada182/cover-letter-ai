import { navigationLinks } from "@/constants";
import { APIError, NavigationLink } from "@/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useIsFetching, useIsMutating } from "react-query";

type Props = {
  children: React.ReactNode
}

interface PageContextType {
  loading: boolean
  error: Error | APIError | null
  currentNavigationLink: NavigationLink | undefined
  setLoading: (loading: boolean) => void
  setError: (error: Error | APIError | null) => void
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | APIError | null>(null);
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const queryLoading: boolean = useMemo(() => {
    console.log("fetching", isFetching)
    console.log("mutating", isMutating)
    if (isFetching > 0 || isMutating > 0) {
      return true
    }
    return false
  }, [isFetching, isMutating])
  const pathname = usePathname()
  const currentNavigationLink = navigationLinks.find((link) => link.path === pathname)

  useEffect(() => {
    setError(null)
    setLoading(false)
  }, [pathname])

  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading])

  return (
    <PageContext.Provider value={{ loading, error, currentNavigationLink, setLoading, setError }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};
