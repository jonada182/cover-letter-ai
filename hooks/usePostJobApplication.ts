import postJobApplication, { RequestProps } from "@/api/job-application/postJobApplication";
import { APIError, JobApplication, JobApplicationRequest } from "@/types"
import { useMutation } from "react-query"

const usePostJobApplication = () => {
  return useMutation<JobApplication, APIError, RequestProps>(postJobApplication);
}

export default usePostJobApplication
