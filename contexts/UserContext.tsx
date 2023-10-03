import { useGetUser } from "@/hooks"
import { HttpStatusCode } from "axios"
import { UUID } from "crypto"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type Props = {
  children: React.ReactNode
}

interface UserContextType {
  profileId: UUID | null
  linkedInAccessToken: string | null
  isLoggedIn: boolean
  isLoading: boolean
  setProfileId: (profileId: UUID | null) => void
  setLinkedInAccessToken: (token: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  signOut: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const queryParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [profileId, setProfileId] = useState<UUID | null>(null);
  const [linkedInAccessToken, setLinkedInAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: userData, error: userError, isLoading: userIsLoading } = useGetUser({ access_token: linkedInAccessToken })

  const signOut = useCallback(() => {
    sessionStorage.removeItem("access_token")
    setLinkedInAccessToken(null)
    setProfileId(null)
    setIsLoggedIn(false)
  }, [])

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (storedToken && storedToken !== "") {
      setLinkedInAccessToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const accessToken = queryParams.get("access_token")
    if (accessToken && accessToken !== "") {
      setLinkedInAccessToken(accessToken)
      router.replace(pathname)
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken])

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (linkedInAccessToken && linkedInAccessToken !== storedToken) {
      sessionStorage.setItem("access_token", linkedInAccessToken)
    }
  }, [linkedInAccessToken])

  useEffect(() => {
    if (userData && userData.profile_id) {
      setProfileId(userData.profile_id)
      setIsLoggedIn(true)
      console.log("Got it")
    } else {
      console.log("Didn't get it")
    }
  }, [userData])

  useEffect(() => {
    if (userError && userError?.status == HttpStatusCode.Unauthorized) {
      setIsLoggedIn(false)
      setProfileId(null)
    }
  }, [userError])

  useEffect(() => {
    if (isLoggedIn) {
      router.back()
    } else if (!userIsLoading) {
      router.push("/login")
    }
  }, [isLoggedIn, router, userIsLoading])

  const contextValues = useMemo(() => ({
    isLoggedIn,
    profileId,
    linkedInAccessToken,
    isLoading: userIsLoading,
    setIsLoggedIn,
    setProfileId,
    setLinkedInAccessToken,
    signOut,
  }), [isLoggedIn, profileId, linkedInAccessToken, userIsLoading])

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
