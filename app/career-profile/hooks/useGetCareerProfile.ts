import { getCareerProfile } from "@/app/career-profile/api";
import { useUserContext } from "@/contexts/UserContext";
import { APIError, CareerProfile } from "@/types";
import { useQuery } from "react-query";

const useGetCareerProfile = () => {
  const { linkedInAccessToken, profileId } = useUserContext();
  return useQuery<CareerProfile, APIError>({
    queryKey: ["career_profile", profileId],
    queryFn: () =>
      getCareerProfile({
        profile_id: profileId,
        access_token: linkedInAccessToken,
      }),
    enabled: !!profileId && !!linkedInAccessToken,
  });
};

export default useGetCareerProfile;
