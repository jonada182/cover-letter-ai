import axios from "axios";
import { handleAxiosError } from "@/api"
import { CareerProfile } from "@/types";
import { UUID } from "crypto";

type RequestProps = {
    profileId: UUID | null,
    accessToken: string | null
}

interface APIResponse {
  data: CareerProfile
}

const getCareerProfile = async ({ profileId, accessToken }: RequestProps): Promise<CareerProfile> => {
  try {
    const response = await axios.get<APIResponse>("/career-profile", {
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

export default getCareerProfile
