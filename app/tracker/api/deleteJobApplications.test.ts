import axios from "axios";
import { deleteJobApplication } from "."
import { testAccessToken, testJobApplicationID, testProfileID } from "@/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const headers = {
  Authorization: `Bearer ${testAccessToken}`,
  UserID: testProfileID,
}

describe("deleteJobApplication", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    const expectedResponse = { message: "deleted" }
    mockedAxios.delete.mockResolvedValueOnce({ data: expectedResponse})
    const data = await deleteJobApplication({ jobApplicationId: testJobApplicationID, access_token: testAccessToken, profile_id: testProfileID })
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
    expect(data).toBe(expectedResponse)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ message: "deleted"})
    const data = await deleteJobApplication({ jobApplicationId: testJobApplicationID, access_token: testAccessToken, profile_id: testProfileID })
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("oops!"))
    expect(deleteJobApplication({ jobApplicationId: testJobApplicationID, access_token: testAccessToken, profile_id: testProfileID })).rejects.toThrow("oops!")
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
  })
})
