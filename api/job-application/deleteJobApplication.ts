import { JobApplication } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";
import { UUID } from "crypto";

export type RequestProps = {
  jobApplicationId: UUID | null
  access_token: string | null
  profile_id: UUID | null
}

export interface APIResponse {
    message: string
}

const deleteJobApplication = async ({ jobApplicationId, access_token, profile_id }: RequestProps): Promise<APIResponse> => {
  try {
    const response = await axios.delete<APIResponse>(
      `/job-applications/${jobApplicationId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          UserID: profile_id,
        }
      }
    );
    return response?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default deleteJobApplication
