import axios from "axios";
import { postCoverLetter } from "."
import { testCoverLetter, testCoverLetterRequest, testProfileID } from "@/app/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("postCoverLetter", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("creates cover letter successfully", async () => {
    const expectedResponse = { data: testCoverLetter }
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResponse})
    const data = await postCoverLetter(testCoverLetterRequest)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/cover-letter", testCoverLetterRequest)
    expect(data).toBe(testCoverLetter)
  })
  it("fails to create cover letter when missing fields", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "nothing in return"})
    expect(postCoverLetter({
      profile_id: testProfileID,
      job_posting: {
        ...testCoverLetterRequest.job_posting,
        company_name: "",
        job_role: "",
      }
    })).rejects.toThrow("required fields are missing")
    expect(mockedAxios.post).toBeCalledTimes(0)
  })
  it("API returns with an error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("oops!"))
    expect(postCoverLetter(testCoverLetterRequest)).rejects.toThrow("oops!")
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/cover-letter", testCoverLetterRequest)
  })
})