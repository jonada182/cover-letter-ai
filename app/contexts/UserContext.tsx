import { useGetUser } from "@/hooks"
import { HttpStatusCode } from "axios"
import { UUID } from "crypto"
import React, { createContext, useContext, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

interface UserContextType {
  profileId: UUID | null
  linkedInAccessToken: string | null
  isLoggedIn: boolean
  setProfileId: (profileId: UUID | null) => void
  setLinkedInAccessToken: (token: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const [profileId, setProfileId] = useState<UUID | null>(null);
  const [linkedInAccessToken, setLinkedInAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: userData, error: userError } = useGetUser({ access_token: linkedInAccessToken })

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (storedToken && storedToken !== "") {
      setLinkedInAccessToken(storedToken)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (linkedInAccessToken && linkedInAccessToken !== storedToken) {
      sessionStorage.setItem("access_token", linkedInAccessToken)
    }
  }, [linkedInAccessToken])

  useEffect(() => {
    if (userError && userError?.status == HttpStatusCode.Unauthorized) {
      setIsLoggedIn(false)
      setProfileId(null)
    }
    if (userData && userData.profile_id) {
      setProfileId(userData.profile_id)
      setIsLoggedIn(true)
    }
  }, [userData, userError, setProfileId, setIsLoggedIn])

  return (
    <UserContext.Provider value={{ isLoggedIn, profileId, linkedInAccessToken, setIsLoggedIn, setProfileId, setLinkedInAccessToken }}>
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
