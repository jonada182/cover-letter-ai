import postCoverLetter, { RequestProps } from "@/api/cover-letter/postCoverLetter";
import { APIError } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
  return useMutation<string, APIError, RequestProps>(postCoverLetter);
}

export default usePostCoverLetter
