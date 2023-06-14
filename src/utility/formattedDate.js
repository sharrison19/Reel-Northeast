const getFormattedDate = () => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

export default getFormattedDate;
