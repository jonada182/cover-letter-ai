import axios from "axios";
import { handleAxiosError } from "../api"
import { JobApplication } from "@/types";
import { UUID } from "crypto";

type RequestProps = {
  profile_id: UUID | null,
  access_token: string | null
}

interface APIResponse {
  data: JobApplication[]
}

const getJobApplications = async ({ profile_id, access_token }: RequestProps): Promise<JobApplication[]> => {
  try {
    const response = await axios.get<APIResponse>(`/job-applications/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getJobApplications
