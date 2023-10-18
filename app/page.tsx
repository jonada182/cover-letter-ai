"use client";
import useGetCareerProfile from "@/app/career-profile/hooks/useGetCareerProfile";
import { useUserContext } from "@/contexts/UserContext";
import { PageCardButton, PageHero } from "@/components/Page";
import { usePageContext } from "@/contexts/PageContext";

export default function Page() {
  const { signOut } = useUserContext();
  const { loading: pageIsLoading } = usePageContext();
  const { data: careerProfile } = useGetCareerProfile();

  if (pageIsLoading) {
    return null;
  }

  return (
    <div className="flex flex-col flex-grow justify-center gap-6">
      <PageHero
        heading={careerProfile && `Hi, ${careerProfile.first_name}`}
        actionText="Sign out"
        handleOnClick={signOut}
      />
      <div className="flex md:flex-row flex-col gap-6">
        <PageCardButton
          theme="blue"
          icon="letter"
          text="Cover Letters"
          url="/cover-letter"
        />
        <PageCardButton
          theme="gray"
          icon="profile"
          text="My Profile"
          url="/career-profile"
        />
        <PageCardButton
          theme="pink"
          icon="job"
          text="Job Applications"
          url="/tracker"
        />
      </div>
    </div>
  );
}
