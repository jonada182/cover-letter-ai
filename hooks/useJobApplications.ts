import { getJobApplications } from "@/api/job-application"
import postJobApplication, { RequestProps } from "@/api/job-application/postJobApplication"
import { useUserContext } from "@/app/contexts/UserContext"
import { APIError, JobApplication } from "@/types"
import { useMemo } from "react"
import { useMutation, useQuery } from "react-query"

type Props = {
    isEnabled?: boolean
}

const useJobApplications = (props?: Props) => {
  const { linkedInAccessToken, profileId } = useUserContext()
  const { refetch, data, isLoading: fetchIsLoading, error: fetchError } = useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", profileId],
    queryFn: () => getJobApplications({ profile_id: profileId, access_token: linkedInAccessToken}),
    enabled: !!profileId && !!!props?.isEnabled,
  })
  const { mutate, reset, error: postError, isLoading: postIsLoading, isSuccess: postIsSuccess } = useMutation<JobApplication, APIError, RequestProps>({
    mutationFn: postJobApplication,
    mutationKey: ["job_applications", profileId],
  });
  return { refetch, mutate, reset, data, fetchError, fetchIsLoading, postError, postIsLoading, postIsSuccess }
}

export default useJobApplications
