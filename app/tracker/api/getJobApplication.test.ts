import axios from "axios";
import { getJobApplication } from "."
import { testAccessToken, testJobApplication, testProfileID, testJobApplicationID } from "@/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const headers = {
  Authorization: `Bearer ${testAccessToken}`,
  UserID: testProfileID,
}

describe("getJobApplication", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    const expectedResponse = { data: testJobApplication }
    mockedAxios.get.mockResolvedValueOnce({ data: expectedResponse})
    const data = await getJobApplication({ jobApplicationId: testJobApplicationID, profileId: testProfileID, accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
    expect(data).toBe(testJobApplication)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: "unknown data"})
    const data = await getJobApplication({ jobApplicationId: testJobApplicationID, profileId: testProfileID, accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("oops!"))
    expect(getJobApplication({ jobApplicationId: testJobApplicationID, profileId: testProfileID, accessToken: testAccessToken })).rejects.toThrow("oops!")
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/job-applications/${testJobApplicationID}`, { headers: headers })
  })
})
