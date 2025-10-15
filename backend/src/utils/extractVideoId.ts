export function extractVideoId(url: any) {
  if (typeof url !== "string") {
    console.error("Invalid input: URL must be a string.");
    return null;
  }
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};