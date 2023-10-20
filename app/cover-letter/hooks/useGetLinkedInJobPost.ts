import { useQuery } from "react-query";
import { APIError, LinkedInJobPost } from "@/types";
import { extractIdFromLinkedInJobURL } from "@/utils/scraper";
import getLinkedInJobPost from "@/app/cover-letter/api/getLinkedInJobPost";

const useGetLinkedInJobPost = (url: string) => {
  const linkedInJobId = extractIdFromLinkedInJobURL(url);
  return useQuery<LinkedInJobPost, APIError>({
    queryKey: ["linkedin_job_post", linkedInJobId],
    queryFn: () => getLinkedInJobPost(linkedInJobId),
    enabled: !!linkedInJobId,
  });
};

export default useGetLinkedInJobPost;
