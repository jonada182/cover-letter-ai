import { getJobApplications } from "@/api/job-application"
import postJobApplication, { RequestProps } from "@/api/job-application/postJobApplication"
import deleteJobApplication, { APIResponse as deleteAPIResponse, RequestProps as deleteRequestProps } from "@/api/job-application/deleteJobApplication"
import { useUserContext } from "@/app/contexts/UserContext"
import { APIError, JobApplication } from "@/types"
import { useMutation, useQuery } from "react-query"

type Props = {
    isEnabled?: boolean
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
    reset: resetDelete,
    error: deleteError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
  } = useMutation<deleteAPIResponse, APIError, deleteRequestProps>({
    mutationFn: deleteJobApplication,
    mutationKey: ["job_applications", profileId],
  });
  return {
    refetch,
    mutate,
    reset,
    deleteApplication,
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
