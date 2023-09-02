import { AxiosResponse } from "axios"
import { api } from "../api"

type RequestProps = {
    email: string
}

type APIResponse = {
    data: []
}

type APIError = {
    error: string
}

const getCareerProfile = async ({ email }: RequestProps) => {
    const apiUrl = `/career-profile/${email}`
    return await api.get(apiUrl)
}

export default getCareerProfile