import { JobApplication } from "@/types";
import { handleAxiosError } from "@/api";
import axios from "axios";
import { isValidURL } from "@/utils";

export type RequestProps = {
  jobApplication: JobApplication
  accessToken: string | null
}

interface APIResponse {
    data: JobApplication
}

const postJobApplication = async ({ jobApplication, accessToken }: RequestProps): Promise<JobApplication> => {
  try {
    if (!jobApplication.profile_id) {
      throw new Error("no profile ID provided")
    }
    if (jobApplication.company_name === "" || jobApplication.job_role === "") {
      throw new Error("required fields are missing")
    }
    if (jobApplication.url && jobApplication.url != "") {
      if (!isValidURL(jobApplication.url))
        throw new Error("url is invalid")
    }
    const response = await axios.post<APIResponse>(
      "/job-applications",
      jobApplication,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          UserID: jobApplication.profile_id,
        }
      }
    );
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postJobApplication
