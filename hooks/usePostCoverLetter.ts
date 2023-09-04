import { postCoverLetter } from "@/api/cover-letter"
import { CoverLetterRequest } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
    return useMutation<string, Error, CoverLetterRequest>(postCoverLetter);
}

export default usePostCoverLetter