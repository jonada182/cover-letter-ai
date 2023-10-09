import postCoverLetter, { RequestProps } from "@/app/cover-letter/api/postCoverLetter";
import { usePageContext } from "@/contexts/PageContext";
import { APIError } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
  const { setError } = usePageContext()
  return useMutation<string, APIError, RequestProps>({
    mutationFn: postCoverLetter,
    mutationKey: ["postCoverLetter"],
    onError(err) {
      setError(err)
    },
  });
}

export default usePostCoverLetter
