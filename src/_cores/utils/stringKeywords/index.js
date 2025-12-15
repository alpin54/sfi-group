const stringKeywords = (str) => {
  return str.toLowerCase().trim().replace(/\s+/g, ', ');
};

export default stringKeywords;
