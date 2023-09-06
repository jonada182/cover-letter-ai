import { isValidEmail } from "."

describe("utils", () => {
  test("isValidEmail", () => {
    expect(isValidEmail("test@test")).toBe(false);
    expect(isValidEmail("test@test.com")).toBe(true);
  })
})
