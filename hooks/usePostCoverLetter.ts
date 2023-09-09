import { postCoverLetter } from "@/api/cover-letter"
import { APIError, CoverLetterRequest } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
  return useMutation<string, APIError, CoverLetterRequest>(postCoverLetter);
}

export default usePostCoverLetter
