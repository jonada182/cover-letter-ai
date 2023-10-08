import { getJobApplications } from "@/app/tracker/api";
import { useUserContext } from "@/contexts/UserContext";
import { APIError, JobApplication } from "@/types";
import { useQuery } from "react-query";

type Props = {
  isEnabled?: boolean;
};

const useJobApplications = (props?: Props) => {
  const { linkedInAccessToken, profileId } = useUserContext();
  const {
    refetch,
    data,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", profileId],
    queryFn: () =>
      getJobApplications({
        profileId: profileId,
        accessToken: linkedInAccessToken,
      }),
    enabled: !!profileId && !!!props?.isEnabled,
  });

  return {
    refetch,
    data,
    fetchError,
    fetchIsLoading,
  };
};

export default useJobApplications;
