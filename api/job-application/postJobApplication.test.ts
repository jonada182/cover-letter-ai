import axios from "axios";
import { postJobApplication } from "."
import { testJobApplication, testEmail, testJobApplicationRequest } from "@/app/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("postJobApplication", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("posts job application successfully", async () => {
    const expectedResponse = { data: testJobApplication }
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResponse})
    const data = await postJobApplication(testJobApplicationRequest)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith(`/job-application/${testEmail}`, testJobApplicationRequest.job_application)
    expect(data).toBe(testJobApplication)
  })
  it("fails to post job application when missing fields", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "nothing in return"})
    expect(postJobApplication({
      email: testEmail,
      job_application: {
        company_name: "",
        job_role: ""
      }
    })).rejects.toThrow("required fields are missing")
    expect(mockedAxios.post).toBeCalledTimes(0)
  })
  it("API returns with an error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("oops!"))
    expect(postJobApplication(testJobApplicationRequest)).rejects.toThrow("oops!")
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith(`/job-application/${testEmail}`, testJobApplicationRequest.job_application)
  })
})
