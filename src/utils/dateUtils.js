export const FormateDateTime = (date) => {
  let givenDate = new Date(date);
  let minutes = givenDate.getMinutes();
  let hours = givenDate.getHours();
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }

  return `${hours}:${minutes}`;
};

export const SortByDate = (date, secondDate) => {
  let tempA = new Date(date).getTime();
  let tempB = new Date(secondDate).getTime();
  if (tempA > tempB) {
    return 1;
  } else if (tempA < tempB) {
    return -1;
  } else {
    return 0;
  }
};

export const setTimeOutHandler = (date, callback, timeToReduce = 0) => {
  let dateWaited = new Date(date);
  let milisecondToWait = dateWaited.getTime() - Date.now() - timeToReduce;
  setTimeout(() => {
    callback()
  }, milisecondToWait);
};
