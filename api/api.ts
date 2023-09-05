import { apiUrl } from "@/constants";
import { APIError } from "@/types";
import axios from "axios";

export const api = axios.create({
    baseURL: apiUrl,
})

export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const apiError: APIError = {
        status: error.response?.status,
        message: error.response?.data?.error,
        code: error.code,
        name: error.name,
        error: new Error(error.message),
    }
    throw apiError
  } else {
    throw new Error(error.message)
  }
}