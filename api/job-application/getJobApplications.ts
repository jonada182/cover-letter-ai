import axios from "axios";
import { handleAxiosError } from "../api"
import { JobApplication } from "@/types";
import { UUID } from "crypto";

type RequestProps = {
  profile_id: UUID
}

interface APIResponse {
  data: JobApplication[]
}

const getJobApplications = async ({ profile_id }: RequestProps): Promise<JobApplication[]> => {
  try {
    const response = await axios.get<APIResponse>(`/job-application/${profile_id}`);
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getJobApplications
