import { CoverLetterRequest } from "@/types";
import { handleAxiosError } from "@/api";
import axios from "axios";

export type RequestProps = {
  coverLetterRequest: CoverLetterRequest
  accessToken: string | null
}

interface APIResponse {
    data: string
}

const postCoverLetter = async ({ coverLetterRequest, accessToken }: RequestProps): Promise<string> => {
  if (
    coverLetterRequest.profile_id?.toString() === "" ||
        coverLetterRequest.job_posting.company_name === "" ||
        coverLetterRequest.job_posting.job_role === ""
  ) {
    throw new Error("required fields are missing")
  }
  try {
    const response = await axios.post<APIResponse>("/cover-letter", coverLetterRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        UserID: coverLetterRequest.profile_id,
      }
    });
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postCoverLetter
