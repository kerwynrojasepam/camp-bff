export const getSlug = (text: string | number) => {
  return `${text}`.toLowerCase().replace(/\s+/g, '-');
};
