//DATE STUFF
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date) => {

  return new Date(date).toString().substr(0, 10)
}
export const date = new Date();
date.setDate(date.getDate() + 3);

export const dateFormated = date.toISOString().substr(0, 10);

export const currentTime = new Date(date.getTime()).toLocaleTimeString();

export const currentTimeFormated = currentTime.slice(0, -3);

export const timePlusHour = new Date(
  date.getTime() + 1 * 60 * 60 * 1000
).toLocaleTimeString();

export const month = monthNames[date.getMonth()];

export const getWeek = (setCurrentWeek, setAverageDailySaved, state) => {
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = date.getDate() - date.getDay() + i;
    let day = new Date(date.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }
  //GET JOB SAVED DATES

  let currentWeek = week[0].substring(5) + " through " + week[6].substring(5);
  setCurrentWeek(currentWeek);
  let jobDates = [];
  state.map((job) => {
    if (job.date_added) {
      jobDates.push(job.date_added.substring(0, 10));
    }
  });
  //COUNT DUPLICATE DATES BY WEEK

  let weeklyJobSaved = 0;
  for (let i = 0; i < jobDates.length; i++) {
    for (let k = 0; k < week.length; k++) {
      if (jobDates[i] === week[k].substring(0, 10)) {
        weeklyJobSaved++;
      }
    }
  }
  //GET AVERAGE DAILY JOBS SAVED

  let averageDailySaved = (weeklyJobSaved / 7).toFixed(2);
  setAverageDailySaved(averageDailySaved);
};

// GET DAYS AGO

export const getDaysAgo = (date) => {
  var now = new Date()
  var ago = new Date(date)
 var diff = (Number(now) - Number(ago)) / (1000*60*60*24)
 return Math.floor(diff)
 

}
