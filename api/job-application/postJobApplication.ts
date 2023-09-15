import { JobApplication, JobApplicationRequest } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";

interface APIResponse {
    data: JobApplication
}

const postJobApplication = async (request: JobApplicationRequest): Promise<JobApplication> => {
  if (request.job_application.company_name === "" || request.job_application.job_role === "") {
    throw new Error("required fields are missing")
  }
  try {
    const response = await axios.post<APIResponse>(`/job-application/${request.profile_id}`, request.job_application);
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postJobApplication
