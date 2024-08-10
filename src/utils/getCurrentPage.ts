export const getCurrentPage = (offset: number, pageSize: number) => {
  return Math.floor(offset / pageSize) + 1;
};
