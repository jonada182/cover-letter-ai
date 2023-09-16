"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "./contexts/UserContext";
import { useGetCareerProfile } from "@/hooks";
import { usePageContext } from "./contexts/PageContext";
import Login from "@/components/Login";
import { PageCardButton, PageHero } from "@/components/Page";

export default function Page() {
  const {
    isLoggedIn,
    profileId,
    isLoading: userIsLoading,
    setLinkedInAccessToken,
    signOut
  } = useUserContext()
  const { loading: pageIsLoading, setLoading, setError } = usePageContext()
  const queryParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { data: careerProfile, isLoading: careerProfileIsLoading, error: careerProfileError } = useGetCareerProfile({ profile_id: profileId, isEnabled: false })
  const isLoading = userIsLoading || careerProfileIsLoading

  useEffect(() => {
    const accessToken = queryParams.get("access_token")
    if (accessToken && accessToken !== "") {
      setLinkedInAccessToken(accessToken)
      router.replace(pathname)
    }
  }, [pathname, queryParams, router, setLinkedInAccessToken])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setError(careerProfileError)
  }, [careerProfileError])

  if (!isLoggedIn && !pageIsLoading) {
    return <Login />
  }
  if (isLoggedIn) {
    return (
      <div className="flex flex-col gap-6">
        <PageHero
          heading={careerProfile && `Hi, ${careerProfile.first_name}`}
          actionText="Sign out"
          handleOnClick={signOut}
        />
        <div className="flex md:flex-row flex-col gap-6">
          <PageCardButton theme="blue" icon="letter" text="Cover Letters" url="/cover-letter" />
          <PageCardButton theme="pink" icon="job" text="Job Applications" url="/tracker" />
          <PageCardButton theme="gray" icon="profile" text="My Profile" url="/career-profile" />
        </div>
      </div>
    )
  }
}
