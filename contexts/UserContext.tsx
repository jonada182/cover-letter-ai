import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { HttpStatusCode } from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { UUID } from "crypto"
import { useGetUser } from "@/hooks"
import { usePageContext } from "./PageContext"

type Props = {
  children: React.ReactNode
}

interface UserContextType {
  isLoggedIn: boolean
  profileId: UUID | null
  linkedInAccessToken: string | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setProfileId: (profileId: UUID | null) => void
  setLinkedInAccessToken: (token: string) => void
  signOut: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const queryParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<UUID | null>(null);
  const [linkedInAccessToken, setLinkedInAccessToken] = useState<string | null>(null);
  const { data: userData, error: userError, isLoading: userIsLoading } = useGetUser({ access_token: linkedInAccessToken })
  const { setLoading: setPageLoading } = usePageContext()

  /**
   * removes access token from session storage, clears the login state and redirects to login page
   */
  const signOut = useCallback(() => {
    sessionStorage.removeItem("access_token")
    setLinkedInAccessToken(null)
    setProfileId(null)
    setIsLoggedIn(false)
    router.replace("/login")
  }, [router])

  // Set linked access token from session storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (storedToken && storedToken !== "") {
      setLinkedInAccessToken(storedToken)
    }
  }, [])

  /**
   *  Get access_token query param from callback redirect
   *  Save access_token in session storage and clear the query param
   */
  useEffect(() => {
    const accessToken = queryParams.get("access_token")
    if (accessToken && accessToken !== "") {
      sessionStorage.setItem("access_token", accessToken)
      setLinkedInAccessToken(accessToken)
      router.replace(pathname)
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken])

  /**
   * If user data is returned from API, set login state and profileId
   * Redirect to home page after login page
   */
  useEffect(() => {
    if (userData && userData.profile_id) {
      setProfileId(userData.profile_id)
      setIsLoggedIn(true)
      if (pathname == "/login") {
        router.replace("/")
      }
    }
  }, [userData, router, pathname, userIsLoading])

  // If user data request is unathorized, we sign out
  useEffect(() => {
    if (userError && userError?.status == HttpStatusCode.Unauthorized) {
      signOut()
    }
    setPageLoading(userIsLoading)
  }, [setPageLoading, userError, userIsLoading])

  const contextValues = useMemo(() => ({
    isLoggedIn,
    profileId,
    linkedInAccessToken,
    setIsLoggedIn,
    setProfileId,
    setLinkedInAccessToken,
    signOut,
  }), [isLoggedIn, profileId, linkedInAccessToken])

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a PageProvider");
  }
  return context;
};
