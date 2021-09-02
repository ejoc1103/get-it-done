let timeConverter = time => {
  let timeValue;
  if (time !== "") {
    let standardTime = time; // your input

    standardTime = standardTime.split(":"); // convert to array

    // fetch
    let hours = Number(standardTime[0]);
    let minutes = Number(standardTime[1]);

    // calculate

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM
  } else {
    timeValue = "";
  }
  return timeValue;
};

export default timeConverter;
