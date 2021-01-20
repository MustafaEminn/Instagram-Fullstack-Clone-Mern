export const checkString = (e: string, regex: RegExp) => {
  const match = e.match(regex);
  if (match) {
    return true;
  }
};
