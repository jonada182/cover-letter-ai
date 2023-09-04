import { CoverLetterRequest } from "@/types";
import { api } from "../api";

interface APIResponse {
    data: string
}

const postCoverLetter = async (coverLetterRequest: CoverLetterRequest): Promise<string> => {
    if (
        coverLetterRequest.email === "" || 
        coverLetterRequest.job_posting.company_name === "" || 
        coverLetterRequest.job_posting.job_role === ""
    ) {
        throw new Error("required fields are missing")
    }
    try {
        const response = await api.post<APIResponse>(`/cover-letter`, coverLetterRequest);
        return response?.data?.data;
    } catch (error:any) {
        throw error
    }
}

export default postCoverLetter