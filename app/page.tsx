"use client"
import { useEffect } from "react";
import useGetCareerProfile from "@/app/career-profile/hooks/useGetCareerProfile";
import { usePageContext } from "@/contexts/PageContext";
import { useUserContext } from "@/contexts/UserContext";
import { PageCardButton, PageHero } from "@/components/Page";

export default function Page() {
  const {
    profileId,
    isLoading: userIsLoading,
    signOut
  } = useUserContext()
  const { setLoading, setError } = usePageContext()
  const { data: careerProfile, isLoading: careerProfileIsLoading, error: careerProfileError } = useGetCareerProfile({ profile_id: profileId, isEnabled: false })
  const isLoading = userIsLoading || careerProfileIsLoading

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setError(careerProfileError)
  }, [careerProfileError])

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
