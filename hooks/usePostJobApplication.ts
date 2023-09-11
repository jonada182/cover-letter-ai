import { postJobApplication } from "@/api/job-application";
import { APIError, JobApplication, JobApplicationRequest } from "@/types"
import { useMutation } from "react-query"

const usePostJobApplication = () => {
  return useMutation<JobApplication, APIError, JobApplicationRequest>(postJobApplication);
}

export default usePostJobApplication
