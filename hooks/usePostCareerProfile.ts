import { postCareerProfile } from "@/api/career-profile";
import { APIError, CareerProfile } from "@/types"
import { useMutation } from "react-query"

const usePostCareerProfile = () => {
  return useMutation<CareerProfile, APIError, CareerProfile>(postCareerProfile);
}

export default usePostCareerProfile
