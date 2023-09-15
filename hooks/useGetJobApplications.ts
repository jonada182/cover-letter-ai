import { getJobApplications } from "@/api/job-application"
import { APIError, JobApplication } from "@/types"
import { isValidEmail } from "@/utils"
import { UUID } from "crypto"
import { useQuery } from "react-query"

type Props = {
    profile_id: UUID
    isEnabled?: boolean
}

const useGetJobApplications = (props: Props) => {
  return useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", props.profile_id],
    queryFn: () => getJobApplications({ profile_id: props.profile_id}),
    enabled: isValidEmail(props.profile_id) && !!!props.isEnabled,
  })
}

export default useGetJobApplications
