import axios from "axios";
import { getCareerProfile } from "."
import { testAccessToken, testCareerProfile, testProfileID } from "@/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const headers = {
  Authorization: `Bearer ${testAccessToken}`,
  UserID: testProfileID,
}

describe("getCareerProfile", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    const expectedResponse = { data: testCareerProfile }
    mockedAxios.get.mockResolvedValueOnce({ data: expectedResponse})
    const data = await getCareerProfile({ profile_id: testProfileID, access_token: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/career-profile/${testProfileID}`, { headers: headers})
    expect(data).toBe(testCareerProfile)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: "unknown data"})
    const data = await getCareerProfile({ profile_id: testProfileID, access_token: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/career-profile/${testProfileID}`, { headers: headers})
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("oops!"))
    expect(getCareerProfile({ profile_id: testProfileID, access_token: testAccessToken })).rejects.toThrow("oops!")
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith(`/career-profile/${testProfileID}`, { headers: headers})
  })
})
