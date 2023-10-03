import { getJobApplications } from "@/app/tracker/api"
import postJobApplication, { RequestProps } from "@/app/tracker/api/postJobApplication"
import deleteJobApplication, { APIResponse as deleteAPIResponse, RequestProps as deleteRequestProps } from "@/app/tracker/api/deleteJobApplication"
import { useUserContext } from "@/contexts/UserContext"
import { APIError, JobApplication, JobApplicationEvent } from "@/types"
import { useMutation, useQuery } from "react-query"
import { UUID } from "crypto"

type Props = {
    isEnabled?: boolean
}

type AddEventProps = {
  jobApplicationId: UUID | null
  event: JobApplicationEvent
}

const useJobApplications = (props?: Props) => {
  const { linkedInAccessToken, profileId } = useUserContext()
  const {
    refetch,
    data,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", profileId],
    queryFn: () => getJobApplications({ profile_id: profileId, access_token: linkedInAccessToken}),
    enabled: !!profileId && !!!props?.isEnabled,
  })

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

  const addJobApplicationEvent = ({jobApplicationId, event}: AddEventProps) => {
    let jobApplication = data?.find((jobApplication) => {
      return jobApplication.id === jobApplicationId
    });

    if (jobApplication) {
      reset();
      let events = jobApplication.events || [];
      events.push(event);
      mutate({
        access_token: linkedInAccessToken,
        jobApplication: {
          ...jobApplication,
          events: events
        }
      });
    }
  }

  const deleteJobApplicationEvent = (jobApplicationId: UUID | null, eventIndex: number) => {
    let jobApplication = data?.find((jobApplication) => {
      return jobApplication.id === jobApplicationId
    });

    if (jobApplication) {
      reset();
      let events = jobApplication.events
      events?.splice(eventIndex)
      mutate({
        access_token: linkedInAccessToken,
        jobApplication: {
          ...jobApplication,
          events: events
        }
      });
    }
  }

  return {
    refetch,
    mutate,
    reset,
    deleteApplication,
    addJobApplicationEvent,
    deleteJobApplicationEvent,
    data,
    fetchError,
    fetchIsLoading,
    postError,
    postIsLoading,
    postIsSuccess,
    deleteError,
    deleteIsLoading,
    deleteIsSuccess,
  }
}

export default useJobApplications
