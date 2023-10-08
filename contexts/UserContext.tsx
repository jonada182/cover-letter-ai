import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HttpStatusCode } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UUID } from "crypto";
import { useAuth } from "@/hooks";

type Props = {
  children: React.ReactNode;
};

interface UserContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  profileId: UUID | null;
  linkedInAccessToken: string | null;
  setProfileId: (profileId: UUID | null) => void;
  setLinkedInAccessToken: (token: string) => void;
  signOut: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: Props) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [profileId, setProfileId] = useState<UUID | null>(null);
  const [linkedInAccessToken, setLinkedInAccessToken] = useState<string | null>(
    null
  );
  const isLoggedIn = useMemo(
    () => !!profileId && !!linkedInAccessToken,
    [profileId, linkedInAccessToken]
  );
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useAuth({ accessToken: linkedInAccessToken });

  /**
   * removes access token from session storage, clears the login state and redirects to login page
   */
  const signOut = useCallback(() => {
    sessionStorage.removeItem("access_token");
    setLinkedInAccessToken(null);
    setProfileId(null);
    window.location.href = "/login";
  }, []);

  // Set linked access token from session storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token");
    if (storedToken && storedToken !== "") {
      setLinkedInAccessToken(storedToken);
      if (window.location.pathname == "/login") {
        window.location.href = "/";
      }
    } else if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  /**
   *  Get access_token query param from callback redirect
   *  Save access_token in session storage and clear the query param
   */
  useEffect(() => {
    const accessToken = queryParams.get("access_token");
    if (accessToken && accessToken !== "") {
      sessionStorage.setItem("access_token", accessToken);
      setLinkedInAccessToken(accessToken);
      router.replace(pathname);
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken]);

  /**
   * If user data is returned from API, set login state and profileId
   * Redirect to home page after login page
   */
  useEffect(() => {
    if (userData && userData?.profile_id) {
      setProfileId(userData?.profile_id);
    }
  }, [userData, pathname, router]);

  // If user data request is unathorized, we sign out
  useEffect(() => {
    if (userError && userError?.status == HttpStatusCode.Unauthorized) {
      signOut();
    }
  }, [userError, userIsLoading]);

  const contextValues = useMemo(
    () => ({
      isLoggedIn,
      profileId,
      linkedInAccessToken,
      isLoading: userIsLoading,
      setProfileId,
      setLinkedInAccessToken,
      signOut,
    }),
    [isLoggedIn, profileId, linkedInAccessToken]
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a PageProvider");
  }
  return context;
};
