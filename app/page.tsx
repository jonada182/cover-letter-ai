"use client"
import SignInButton from "@/components/SignInButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "./contexts/UserContext";
import { HttpStatusCode } from "axios";
import { useGetUser } from "@/hooks";

export default function Page() {
  const queryParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const {
    isLoggedIn,
    profileId,
    setIsLoggedIn,
    setProfileId,
    setLinkedInAccessToken
  } = useUserContext()

  useEffect(() => {
    const accessToken = queryParams.get("access_token")
    if (accessToken && accessToken !== "") {
      setLinkedInAccessToken(accessToken)
      router.replace(pathname)
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken])

  return (
    <div>
      {!isLoggedIn && <SignInButton />}
      {`ProfileID: ${profileId}`}
    </div>
  )
}
