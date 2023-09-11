import { getJobApplications } from "@/api/job-application"
import { APIError, JobApplication } from "@/types"
import { isValidEmail } from "@/utils"
import { useQuery } from "react-query"

type Props = {
    email: string
    isEnabled?: boolean
}

const useGetJobApplications = (props: Props) => {
  return useQuery<JobApplication[], APIError>({
    queryKey: ["job_applications", props.email],
    queryFn: () => getJobApplications({ email: props.email}),
    enabled: isValidEmail(props.email) && !!!props.isEnabled,
  })
}

export default useGetJobApplications
