import { getCareerProfile } from "@/api/career-profile"
import { CareerProfile } from "@/types"
import { isValidEmail } from "@/utils"
import { useQuery } from "react-query"

type Props = {
    email: string
    isEnabled?: boolean
}

export const useGetCareerProfile = (props: Props) => {
    return useQuery<CareerProfile, Error>({
        queryKey: [],
        queryFn: () => getCareerProfile({ email: props.email}),
        enabled: isValidEmail(props.email) && !!!props.isEnabled,
    })
}