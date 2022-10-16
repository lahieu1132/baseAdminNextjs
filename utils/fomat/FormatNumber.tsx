export const formatNumber = (i: number): string => {
  if (i < 10) {
    return "0" + i;
  }
  return i.toString();
};
