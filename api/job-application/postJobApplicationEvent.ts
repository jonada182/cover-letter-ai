import { JobApplicationEvent } from "@/types";
import { handleAxiosError } from "../api";
import axios from "axios";

interface APIResponse {
    data: JobApplicationEvent
}

const postJobApplicationEvent = async (jobApplicationEvent: JobApplicationEvent): Promise<JobApplicationEvent> => {
  if (jobApplicationEvent.description === "" || jobApplicationEvent.date === "") {
    throw new Error("required fields are missing")
  }
  try {
    const response = await axios.post<APIResponse>("/job-application/event", jobApplicationEvent);
    return response?.data?.data;
  } catch (error:any) {
    return handleAxiosError(error)
  }
}

export default postJobApplicationEvent
