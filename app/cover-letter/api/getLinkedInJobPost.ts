import { handleAxiosError } from "@/api";
import { scraperUrl } from "@/constants";
import { LinkedInJobPost } from "@/types";
import axios from "axios";

const getLinkedInJobPost = async (
  jobPostingId: string | null
): Promise<LinkedInJobPost> => {
  try {
    if (!jobPostingId) {
      throw new Error("no valid LinkedIn job posting ID");
    }
    const response = await axios.get<LinkedInJobPost>(
      `${scraperUrl}/linkedin/job/${jobPostingId}`
    );
    return response?.data;
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

export default getLinkedInJobPost;
