import moment from "moment";

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isValidURL = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const generateRandomString = (length: number) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const randomString = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return randomString;
};

/**
 * @returns current date (`UTC`) in `YYYY-MM-DD HH:mm:ss` format
 */
export const getCurrentDate = (): string => {
  return moment.utc(moment.now()).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * @param date string
 * @returns given date in `YYYY-MM-DD HH:mm:ss` format
 */
export const formatDate = (date: string | undefined): string => {
  if (typeof date == undefined) {
    return "";
  }
  return moment.utc(date).local().format("MMM DD, YYYY, HH:mm a");
};
