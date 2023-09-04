import { postCoverLetter } from "@/api/cover-letter"
import { CoverLetterRequest } from "@/types"
import { useMutation } from "react-query"

const usePostCoverLetter = () => {
    const { 
        data,
        error,
        isLoading,
        mutate: submit
    } = useMutation<string, Error, CoverLetterRequest>(postCoverLetter);
    return {
        coverLetter: data,
        error,
        isLoading,
        submit,
    }
}

export default usePostCoverLetter