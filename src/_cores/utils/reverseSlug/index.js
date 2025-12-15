const reverseSlug = (slug) => {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default reverseSlug;
