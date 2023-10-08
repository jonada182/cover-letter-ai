import axios from "axios";
import { handleAxiosError } from "@/api";
import { User } from "@/types";

type RequestProps = {
  accessToken: string | null | undefined;
};

const authenticate = async ({ accessToken }: RequestProps): Promise<User> => {
  try {
    const response = await axios.get<User>("/auth", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

export default authenticate;
