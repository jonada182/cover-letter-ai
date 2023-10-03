import postCoverLetter, { RequestProps } from "@/app/cover-letter/api/postCoverLetter";
import { APIError } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
  return useMutation<string, APIError, RequestProps>(postCoverLetter);
}

export default usePostCoverLetter
