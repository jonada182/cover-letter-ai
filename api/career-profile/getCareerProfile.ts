import axios from "axios";
import { handleAxiosError } from "../api"
import { CareerProfile } from "@/types";
import { UUID } from "crypto";

type RequestProps = {
    profile_id: UUID | null,
    access_token: string | null
}

interface APIResponse {
  data: CareerProfile
}

const getCareerProfile = async ({ profile_id, access_token }: RequestProps): Promise<CareerProfile> => {
  try {
    const response = await axios.get<APIResponse>(`/career-profile/${profile_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        UserID: profile_id,
      }
    });
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getCareerProfile
