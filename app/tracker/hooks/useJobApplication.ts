import { getJobApplication } from "@/app/tracker/api";
import postJobApplication, {
  RequestProps,
} from "@/app/tracker/api/postJobApplication";
import deleteJobApplication, {
  APIResponse as deleteAPIResponse,
  RequestProps as deleteRequestProps,
} from "@/app/tracker/api/deleteJobApplication";
import { useUserContext } from "@/contexts/UserContext";
import { APIError, JobApplication, JobApplicationEvent } from "@/types";
import { useMutation, useQuery } from "react-query";
import { UUID } from "crypto";

type Props = {
  jobApplicationId?: UUID | null;
  isEnabled?: boolean;
};

const useJobApplication = (props: Props) => {
  const { linkedInAccessToken, profileId } = useUserContext();
  const {
    refetch,
    data: jobApplication,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useQuery<JobApplication, APIError>({
    queryKey: ["job_applications", profileId, props?.jobApplicationId],
    queryFn: () =>
      getJobApplication({
        jobApplicationId: props.jobApplicationId,
        profileId: profileId,
        accessToken: linkedInAccessToken,
      }),
    enabled: !!profileId && !!props?.jobApplicationId && !!!props?.isEnabled,
  });

  const {
    mutate,
    reset,
    error: postError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
  } = useMutation<JobApplication, APIError, RequestProps>({
    mutationFn: postJobApplication,
    mutationKey: ["job_applications", profileId],
  });

  const {
    mutate: deleteApplication,
    error: deleteError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
  } = useMutation<deleteAPIResponse, APIError, deleteRequestProps>({
    mutationFn: deleteJobApplication,
    mutationKey: ["job_applications", profileId],
  });

  const addJobApplicationEvent = (event: JobApplicationEvent) => {
    if (jobApplication) {
      reset();
      mutate({
        accessToken: linkedInAccessToken,
        jobApplication: {
          ...jobApplication,
          events: [...jobApplication.events  || [], event],
        },
      });
    }
  };

  const deleteJobApplicationEvent = (
    eventIndex: number
  ) => {
    if (jobApplication) {
      reset();
      let events = jobApplication.events;
      events?.splice(eventIndex);
      mutate({
        accessToken: linkedInAccessToken,
        jobApplication: {
          ...jobApplication,
          events: events,
        },
      });
    }
  };

  return {
    refetch,
    mutate,
    reset,
    deleteApplication,
    addJobApplicationEvent,
    deleteJobApplicationEvent,
    jobApplication,
    fetchError,
    fetchIsLoading,
    postError,
    postIsLoading,
    postIsSuccess,
    deleteError,
    deleteIsLoading,
    deleteIsSuccess,
  };
};

export default useJobApplication;
