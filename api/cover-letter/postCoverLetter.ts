import { CoverLetterRequest } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";

export type RequestProps = {
  coverLetterRequest: CoverLetterRequest
  access_token: string | null
}

interface APIResponse {
    data: string
}

const postCoverLetter = async ({ coverLetterRequest, access_token }: RequestProps): Promise<string> => {
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
        Authorization: `Bearer ${access_token}`,
        UserID: coverLetterRequest.profile_id,
      }
    });
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postCoverLetter
