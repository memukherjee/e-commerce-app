export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " year" : " years");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " month" : " months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " day" : " days");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " hour" : " hours");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " minute" : " minutes");
  }
  // console.log(interval);
  return Math.floor(seconds) + (interval < 2 ? " second" : " seconds");
};

export const timeLeft = (date) => {
  var seconds = Math.floor((date - new Date()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " year" : " years");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " month" : " months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " day" : " days");
  }
  interval = seconds / 3600;
  // console.log(interval);

  return interval > 0 ? "today" : "few days";

  // if (interval > 1) {
  //   return Math.ceil(interval) + (interval < 2 ? " hour" : " hours");
  // }
  // interval = seconds / 60;
  // if (interval > 1) {
  //   return Math.ceil(interval) + (interval < 2 ? " minute" : " minutes");
  // }
  // return Math.ceil(seconds) + (interval < 2 ? " second" : " seconds");
};
