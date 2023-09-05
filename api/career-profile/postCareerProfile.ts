import { CareerProfile, CoverLetterRequest } from "@/types";
import { api, handleAxiosError } from "../api";

interface APIResponse {
    data: CareerProfile
}

const postCareerProfile = async (careerProfile: CareerProfile): Promise<CareerProfile> => {
    if (
        careerProfile.headline === "" || 
        careerProfile.experience_years <= 0 || 
        careerProfile.contact_info.email === ""
    ) {
        throw new Error("required fields are missing")
    }
    try {
        if (typeof careerProfile.experience_years === 'string') {
          careerProfile.experience_years = parseInt(careerProfile.experience_years)
        }
        const response = await api.post<APIResponse>(`/career-profile`, careerProfile);
        return response?.data?.data;
    } catch (error:any) {
        return handleAxiosError(error)
    }
}

export default postCareerProfile