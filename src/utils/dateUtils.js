export const FormateDateTime = (date) => {
  let givenDate = new Date(date);
  let minutes = givenDate.getMinutes();
  let hours = givenDate.getHours();
  if(minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if(hours >= 0 && hours <= 9) {
    hours = '0' + hours
  }

  return `${hours}:${minutes}`;
};
