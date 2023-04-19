export const convertTemp = (temp: number, unit: string) => {
  if (unit === "metric") {
    return ((temp - 32) * 5) / 9;
  }
  return temp;
};