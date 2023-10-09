import { postCareerProfile } from "@/app/career-profile/api";
import { usePageContext } from "@/contexts/PageContext";
import { APIError, CareerProfile, CareerProfileRequest } from "@/types"
import { useMutation, useQueryClient } from "react-query"

const usePostCareerProfile = () => {
  const { setError } = usePageContext()
  const queryClient = useQueryClient()
  return useMutation<CareerProfile, APIError, CareerProfileRequest>({
    mutationFn: postCareerProfile,
    mutationKey: ["postCareerProfile"],
    onError(err) {
      setError(err)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["career_profile", data.id]
      })
    },
  });
}

export default usePostCareerProfile
