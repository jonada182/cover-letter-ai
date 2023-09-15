import { postCareerProfile } from "@/api/career-profile";
import { APIError, CareerProfile, CareerProfileRequest } from "@/types"
import { useMutation } from "react-query"

const usePostCareerProfile = () => {
  return useMutation<CareerProfile, APIError, CareerProfileRequest>(postCareerProfile);
}

export default usePostCareerProfile
