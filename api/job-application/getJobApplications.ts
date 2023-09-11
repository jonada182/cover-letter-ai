import axios from "axios";
import { handleAxiosError } from "../api"
import { JobApplication } from "@/types";

type RequestProps = {
    email: string
}

interface APIResponse {
  data: JobApplication[]
}

const getJobApplications = async ({ email }: RequestProps): Promise<JobApplication[]> => {
  try {
    const response = await axios.get<APIResponse>(`/job-application/${email}`);
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getJobApplications
