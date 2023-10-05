import { getUser } from "@/api/user";
import { APIError, User } from "@/types";
import { useQuery } from "react-query";

type Props = {
  access_token?: string | null | undefined;
  isEnabled?: boolean;
};

const useGetUser = (props: Props) => {
  return useQuery<User, APIError>({
    queryKey: [],
    queryFn: () => getUser({ access_token: props.access_token }),
    enabled: !!props.access_token || !!props?.isEnabled,
  });
};

export default useGetUser;
