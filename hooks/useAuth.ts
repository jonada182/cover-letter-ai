import { authenticate } from "@/api/auth";
import { usePageContext } from "@/contexts/PageContext";
import { APIError, User } from "@/types";
import { useQuery } from "react-query";

type Props = {
  accessToken?: string | null | undefined;
  isEnabled?: boolean;
};

const useAuth = (props: Props) => {
  const { setError } = usePageContext()
  return useQuery<User, APIError>({
    queryFn: () => authenticate({ accessToken: props.accessToken }),
    enabled: !!props.accessToken && !!props?.isEnabled,
    onError(err) {
      setError(err)
    },
  });
};

export default useAuth;
