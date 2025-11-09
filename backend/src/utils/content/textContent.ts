export const generateTextContent = (textContent: string) => {
  if (!textContent) return "";

  return textContent
    .replace(/(\/\/date)/g, new Date().toISOString().split("T")[0])
    .replace(/(\/\/date_us)/g, "")
    .replace(/(\/\/date_uk)/g, "")
    .replace(/(\/\/time_hm)/g, "")
    .replace(
      /(\/\/time_hms)/g,
      new Date().toISOString().split("T")[1].split(".")[0]
    );
};
