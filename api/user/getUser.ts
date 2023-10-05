import axios from "axios";
import { handleAxiosError } from "@/api";
import { User } from "@/types";

type RequestProps = {
  access_token: string | null | undefined;
};

const getUser = async ({ access_token }: RequestProps): Promise<User> => {
  try {
    const response = await axios.get<User>("/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

export default getUser;
