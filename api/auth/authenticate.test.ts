import axios from "axios";
import { authenticate } from "."
import { testAccessToken, testCareerProfile, testProfileID, testUser } from "@/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("authenticate", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("fetches data successfully from the API", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: testUser })
    const data = await authenticate({ accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/auth", { headers: { Authorization: `Bearer ${testAccessToken}`}})
    expect(data).toBe(testUser)
  })
  it("fails to fetch data from the API", async () => {
    mockedAxios.get.mockResolvedValueOnce("unknown data")
    const data = await authenticate({ accessToken: testAccessToken })
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/auth", { headers: { Authorization: `Bearer ${testAccessToken}`}})
    expect(data).toBe(undefined)
  })
  it("API returns with an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("oops!"))
    expect(authenticate({ accessToken: testAccessToken })).rejects.toThrow("oops!")
    expect(mockedAxios.get).toHaveBeenCalled()
    expect(mockedAxios.get).toHaveBeenCalledWith("/auth", { headers: { Authorization: `Bearer ${testAccessToken}`}})
  })
})
