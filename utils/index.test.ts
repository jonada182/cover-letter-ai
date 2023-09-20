import { isValidEmail, isValidURL } from "."

describe("utils", () => {
  test("isValidEmail", () => {
    expect(isValidEmail("test@test")).toBe(false);
    expect(isValidEmail("test@test.com")).toBe(true);
  })
  test("isValidURL", () => {
    expect(isValidURL("test")).toBe(false);
    expect(isValidURL("http://test.com")).toBe(true);
  })
})
