import { getCareerProfile } from "@/api/career-profile"
import { CareerProfile } from "@/types"
import { isValidEmail } from "@/utils"
import { useQuery } from "react-query"

type Props = {
    email: string
    isEnabled?: boolean
}

const useGetCareerProfile = (props: Props) => {
    return useQuery<CareerProfile, Error>({
        queryKey: ['career_profile', props.email],
        queryFn: () => getCareerProfile({ email: props.email}),
        enabled: isValidEmail(props.email) && !!!props.isEnabled,
    })
}

export default useGetCareerProfile