export const formatName = (name: string) =>
  name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
