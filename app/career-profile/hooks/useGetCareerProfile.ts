import { getCareerProfile } from "@/app/career-profile/api";
import { usePageContext } from "@/contexts/PageContext";
import { useUserContext } from "@/contexts/UserContext";
import { APIError, CareerProfile } from "@/types";
import { useQuery } from "react-query";

const useGetCareerProfile = () => {
  const { linkedInAccessToken, profileId } = useUserContext();
  const { setError } = usePageContext();
  return useQuery<CareerProfile, APIError>({
    queryKey: ["career_profile", profileId],
    queryFn: () =>
      getCareerProfile({
        profileId: profileId,
        accessToken: linkedInAccessToken,
      }),
    onError(err) {
      setError(err)
    },
    enabled: !!profileId && !!linkedInAccessToken,
  });
};

export default useGetCareerProfile;
