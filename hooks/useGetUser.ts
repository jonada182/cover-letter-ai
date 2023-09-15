import { getUser } from "@/api/user"
import { APIError, User } from "@/types"
import { useQuery } from "react-query"

type Props = {
  access_token: string | null
  isEnabled?: boolean
}

const useGetUser = ({ access_token }: Props) => {
  return useQuery<User, APIError>({
    queryKey: [],
    queryFn: () => getUser({ access_token: access_token}),
    enabled: access_token ? true : false,
  })
}

export default useGetUser
