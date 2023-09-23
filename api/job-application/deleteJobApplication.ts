import { JobApplication } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";
import { UUID } from "crypto";

export type RequestProps = {
  jobApplicationId: UUID
  access_token: string | null
}

export interface APIResponse {
    message: string
}

const deleteJobApplication = async ({ jobApplicationId, access_token }: RequestProps): Promise<APIResponse> => {
  try {
    const response = await axios.delete<APIResponse>(
      `/job-applications/${jobApplicationId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    return response?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default deleteJobApplication
