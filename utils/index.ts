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

/**
 * @param date string
 * @returns the duration from the date given until now
 */
export const dateFromNow = (date: string | undefined): string => {
  if (typeof date == undefined) {
    return "";
  }
  return moment.utc(date).fromNow();
};

export const getLoadingMessage = (): string => {
  const loadingMessages = [
    "Summoning the job genie... Please hold your wishes! 🧞",
    "Cover letters or magic spells? Brewing both... ✨📝",
    "Hiring the AI elves... They're quicker than you'd think! 🧝‍♂️",
    "Loading magic potions for job hunting success! 🍾🔮",
    "Putting on our best digital suit... Be right with you! 👔🤖",
    "The job oracle is gazing into the future... 🔮✨",
    "Our AI is writing, rewriting... and not using clichés! 🤖🖋️",
    "Gathering the best words... to make you the best candidate! 🌟",
    "Casting a job-seeking spell... Fingers crossed for no frogs! 🐸✨",
    "Unleashing the job-hunting dragon! Hope it's trained... 🐉🔥"
  ];
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
}
