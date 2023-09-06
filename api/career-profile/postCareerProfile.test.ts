import axios from "axios";
import { postCareerProfile } from "."
import { testCareerProfile, testEmail } from "@/app/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("postCareerProfile", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("posts career profile successfully", async () => {
    const expectedResponse = { data: testCareerProfile }
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResponse})
    const data = await postCareerProfile(testCareerProfile)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/career-profile", testCareerProfile)
    expect(data).toBe(testCareerProfile)
  })
  it("fails to create career profile when missing fields", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "nothing in return"})
    expect(postCareerProfile({
      ...testCareerProfile,
      headline: "",
      experience_years: 0,
      contact_info: {
        ...testCareerProfile.contact_info,
        email: ""
      }
    })).rejects.toThrow("required fields are missing")
    expect(mockedAxios.post).toBeCalledTimes(0)
  })
  it("API returns with an error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("oops!"))
    expect(postCareerProfile(testCareerProfile)).rejects.toThrow("oops!")
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/career-profile", testCareerProfile)
  })
})
