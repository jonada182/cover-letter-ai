export const validateLinkedInJobURL = (url: string) => {
  const regex = /www\.linkedin\.com\/jobs\/view\/(\d{10})/;
  return regex.test(url);
};

export const extractIdFromLinkedInJobURL = (url: string): string | null => {
  const regex = /www\.linkedin\.com\/jobs\/view\/(\d{10})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
