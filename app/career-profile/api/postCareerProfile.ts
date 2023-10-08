import { CareerProfile } from "@/types";
import { handleAxiosError } from "@/api"
import axios from "axios";

type RequestProps = {
  careerProfile: CareerProfile
  accessToken: string | null
}

interface APIResponse {
    data: CareerProfile
}

const postCareerProfile = async ({careerProfile, accessToken}: RequestProps): Promise<CareerProfile> => {
  if (
    careerProfile.headline === "" ||
        careerProfile.experience_years <= 0 ||
        careerProfile.contact_info.email === ""
  ) {
    throw new Error("required fields are missing")
  }
  try {
    if (typeof careerProfile.experience_years === "string") {
      careerProfile.experience_years = parseInt(careerProfile.experience_years)
    }
    const response = await axios.post<APIResponse>("/career-profile", careerProfile, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        UserID: careerProfile.id,
      }
    });
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postCareerProfile
