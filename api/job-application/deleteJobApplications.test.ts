import axios from "axios";
import { deleteJobApplication } from "."
import { testAccessToken, testJobApplications, testProfileID } from "@/app/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("deleteJobApplication", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    const expectedResponse = { message: "deleted" }
    mockedAxios.delete.mockResolvedValueOnce({ data: expectedResponse})
    const data = await deleteJobApplication({ jobApplicationId: testProfileID, access_token: testAccessToken })
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testProfileID}`, { headers: { Authorization: `Bearer ${testAccessToken}`} })
    expect(data).toBe(expectedResponse)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ message: "deleted"})
    const data = await deleteJobApplication({ jobApplicationId: testProfileID, access_token: testAccessToken })
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testProfileID}`, { headers: { Authorization: `Bearer ${testAccessToken}`} })
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("oops!"))
    expect(deleteJobApplication({ jobApplicationId: testProfileID, access_token: testAccessToken })).rejects.toThrow("oops!")
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(mockedAxios.delete).toHaveBeenCalledWith(`/job-applications/${testProfileID}`, { headers: { Authorization: `Bearer ${testAccessToken}`} })
  })
})
