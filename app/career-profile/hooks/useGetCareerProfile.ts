import { getCareerProfile } from "@/app/career-profile/api"
import { useUserContext } from "@/contexts/UserContext"
import { APIError, CareerProfile } from "@/types"
import { UUID } from "crypto"
import { useQuery } from "react-query"

type Props = {
    profile_id: UUID | null
    isEnabled?: boolean
}

const useGetCareerProfile = (props: Props) => {
  const { linkedInAccessToken } = useUserContext()
  return useQuery<CareerProfile, APIError>({
    queryKey: ["career_profile", props.profile_id],
    queryFn: () => getCareerProfile({ profile_id: props.profile_id, access_token: linkedInAccessToken}),
    enabled: !!props.profile_id && !!!props.isEnabled,
  })
}

export default useGetCareerProfile
