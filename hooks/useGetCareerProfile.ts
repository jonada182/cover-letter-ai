import { getCareerProfile } from "@/api/career-profile"
import { useQuery } from "react-query"

type Props = {
    email: string
}

export const useGetCareerProfile = ({ email }: Props) => {
    const { data, isLoading, error } = useQuery('careerProfile', () => getCareerProfile({ email: email}))
    return {
        data, isLoading, error
    }
}