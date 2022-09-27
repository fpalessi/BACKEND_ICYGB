const generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);
  return random + date; //complex id created
};

module.exports = { generateId };
