import { postJobApplicationEvent } from "@/api/job-application";
import { APIError, JobApplicationEvent } from "@/types"
import { useMutation } from "react-query"

const usePostJobApplicationEvent = () => {
  return useMutation<JobApplicationEvent, APIError, JobApplicationEvent>(postJobApplicationEvent);
}

export default usePostJobApplicationEvent
