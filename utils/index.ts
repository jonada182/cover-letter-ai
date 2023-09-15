export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email)
}

export const generateRandomString = (length: number) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const randomString = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return randomString;
}
