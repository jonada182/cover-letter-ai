import { JobApplication, JobApplicationRequest } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";

export type RequestProps = {
  request: JobApplicationRequest
  access_token: string | null
}

interface APIResponse {
    data: JobApplication
}

const postJobApplication = async ({ request, access_token }: RequestProps): Promise<JobApplication> => {
  if (request.job_application.company_name === "" || request.job_application.job_role === "") {
    throw new Error("required fields are missing")
  }
  try {
    const response = await axios.post<APIResponse>(
      `/job-applications/${request.profile_id}`,
      request.job_application,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postJobApplication
