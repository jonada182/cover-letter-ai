"use client";
import useGetCareerProfile from "@/app/career-profile/hooks/useGetCareerProfile";
import { useUserContext } from "@/contexts/UserContext";
import { PageCardButton, PageHero } from "@/components/Page";

export default function Page() {
  const { signOut } = useUserContext();
  const {
    data: careerProfile,
  } = useGetCareerProfile();

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
          theme="pink"
          icon="job"
          text="Job Applications"
          url="/tracker"
        />
        <PageCardButton
          theme="gray"
          icon="profile"
          text="My Profile"
          url="/career-profile"
        />
      </div>
    </div>
  );
}
