export const FormateDateTime = (date) => {
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
};
