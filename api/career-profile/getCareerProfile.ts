import { api } from "../api"
import { CareerProfile } from "@/types";

type RequestProps = {
    email: string
}

const getCareerProfile = async ({ email }: RequestProps): Promise<CareerProfile> => {
  try {
    const response = await api.get<CareerProfile>(`/career-profile/${email}`);
    return response?.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default getCareerProfile