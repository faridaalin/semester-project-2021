const truncate = (text, size) => {
  return text.length > size ? text.slice(0, size - 1) + '...' : text;
};

export default truncate;
