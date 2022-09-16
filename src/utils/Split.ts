export const splitOnSpace = (data: string) => {
  const splitData = data.split(" ");
  const first = splitData[0];
  const last = splitData[splitData.length - 1];
  return [first, last];
};
