import { getJobApplications } from "@/api/job-application"
import { useUserContext } from "@/app/contexts/UserContext"
import { APIError, JobApplication } from "@/types"
import { useQuery } from "react-query"

type Props = {
    isEnabled?: boolean
}

const useGetJobApplications = (props?: Props) => {
  const { linkedInAccessToken, profileId } = useUserContext()
  return useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", profileId],
    queryFn: () => getJobApplications({ profile_id: profileId, access_token: linkedInAccessToken}),
    enabled: !!profileId && !!!props?.isEnabled,
  })
}

export default useGetJobApplications
