import axios from "axios";
import { handleAxiosError } from "@/api"
import { JobApplication } from "@/types";
import { UUID } from "crypto";

type RequestProps = {
  profileId: UUID | null,
  accessToken: string | null
}

interface APIResponse {
  data: JobApplication[]
}

const getJobApplications = async ({ profileId, accessToken }: RequestProps): Promise<JobApplication[]> => {
  try {
    const response = await axios.get<APIResponse>("/job-applications", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        UserID: profileId,
      }
    });
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getJobApplications
