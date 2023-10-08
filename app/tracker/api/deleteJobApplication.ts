import { handleAxiosError } from "@/api";
import axios from "axios";
import { UUID } from "crypto";

export type RequestProps = {
  jobApplicationId: UUID | null
  accessToken: string | null
  profileId: UUID | null
}

export interface APIResponse {
    message: string
}

const deleteJobApplication = async ({ jobApplicationId, accessToken, profileId }: RequestProps): Promise<APIResponse> => {
  try {
    const response = await axios.delete<APIResponse>(
      `/job-applications/${jobApplicationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          UserID: profileId,
        }
      }
    );
    return response?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default deleteJobApplication
