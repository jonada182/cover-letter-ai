import { authenticate } from "@/api/auth";
import { APIError, User } from "@/types";
import { useQuery } from "react-query";

type Props = {
  accessToken?: string | null | undefined;
  isEnabled?: boolean;
};

const useAuth = (props: Props) => {
  return useQuery<User, APIError>({
    queryKey: [],
    queryFn: () => authenticate({ accessToken: props.accessToken }),
    enabled: !!props.accessToken || !!props?.isEnabled,
  });
};

export default useAuth;
