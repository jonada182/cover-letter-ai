import axios from "axios";
import { getJobApplications } from "."
import { testAccessToken, testJobApplications, testProfileID } from "@/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const headers = {
  Authorization: `Bearer ${testAccessToken}`,
  UserID: testProfileID,
}

describe("getJobApplications", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    const expectedResponse = { data: testJobApplications }
    mockedAxios.get.mockResolvedValueOnce({ data: expectedResponse})
    const data = await getJobApplications({ profileId: testProfileID, accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/job-applications", { headers: headers })
    expect(data).toBe(testJobApplications)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: "unknown data"})
    const data = await getJobApplications({ profileId: testProfileID, accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/job-applications", { headers: headers })
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("oops!"))
    expect(getJobApplications({ profileId: testProfileID, accessToken: testAccessToken })).rejects.toThrow("oops!")
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/job-applications", { headers: headers })
  })
})
