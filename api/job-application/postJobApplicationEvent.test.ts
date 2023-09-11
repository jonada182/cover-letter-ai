import axios from "axios";
import { postJobApplicationEvent } from "."
import { testJobApplicationEvent } from "@/app/test-data";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("postJobApplicationEvent", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("posts job application event successfully", async () => {
    const expectedResponse = { data: testJobApplicationEvent }
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResponse})
    const data = await postJobApplicationEvent(testJobApplicationEvent)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/job-application/event", testJobApplicationEvent)
    expect(data).toBe(testJobApplicationEvent)
  })
  it("fails to post job application event when missing fields", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "nothing in return"})
    expect(postJobApplicationEvent({
      ...testJobApplicationEvent,
      description: ""
    })).rejects.toThrow("required fields are missing")
    expect(mockedAxios.post).toBeCalledTimes(0)
  })
  it("API returns with an error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("oops!"))
    expect(postJobApplicationEvent(testJobApplicationEvent)).rejects.toThrow("oops!")
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toHaveBeenCalledWith("/job-application/event", testJobApplicationEvent)
  })
})
