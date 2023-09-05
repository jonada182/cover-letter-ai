import { api, handleAxiosError } from "../api"
import { CareerProfile } from "@/types";

type RequestProps = {
    email: string
}

interface APIResponse {
  data: CareerProfile
}

const getCareerProfile = async ({ email }: RequestProps): Promise<CareerProfile> => {
  try {
    const response = await api.get<APIResponse>(`/career-profile/${email}`);
    return response?.data?.data;
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

export default getCareerProfile