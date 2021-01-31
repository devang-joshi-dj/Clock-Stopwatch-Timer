"use strict";

const time = () => {
  // function for getting the hour, minute, second, date, month, day-name, year and printing them
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var current_date = date.getDate();
  var month = date.getMonth();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[date.getDay()].substr(0, 3).toUpperCase();
  var year = date.getFullYear();

  if (document.getElementById("formatMode").checked) {
    document.getElementById("clockHour").innerHTML = hour;
  } else {
    if (hour > 12) document.getElementById("clockHour").innerHTML = hour - 12;
    else if (hour < 1)
      document.getElementById("clockHour").innerHTML = hour + 12;
    else document.getElementById("clockHour").innerHTML = hour;
  }

  document.getElementById("clockMinute").innerHTML = minute;
  document.getElementById("clockSecond").innerHTML = second;
  document.getElementById("clockDate").innerHTML = current_date;
  document.getElementById("clockMonth").innerHTML = ++month;
  document.getElementById("clockDayName").innerHTML = dayName;
  document.getElementById("clockYear").innerHTML = year;

  if (hour >= 12) document.getElementById("meridiem").innerHTML = "PM";
  else document.getElementById("meridiem").innerHTML = "AM";
};

setInterval(() => {
  // function for updating of hour, minute, second, date, month, day-name, year every 1/10 second
  time();
}, 100);

const toggleClock = (visibility) => {
  document.getElementsByClassName("formatMode")[0].style.display = visibility;
  document.getElementById("clock").style.display = visibility;
};

const toggleStopwatch = (visibility) => {
  document.getElementById("stopwatch").style.display = visibility;
};

const toggleTimer = (visibility) => {
  document.getElementById("timer").style.display = visibility;
};

window.onload = () => {
  document.getElementById("clockHeading").className += "active";

  document.getElementById("stopwatchReset").disabled = true; // reset button of Stopwatch disabled on page load
  document.getElementById("stopwatchCountLap").disabled = true; // lap button of Stopwatch disabled on page load
  document.getElementById("timerReset").disabled = true; // reset button of Timer disabled on page load
  document.getElementById("timerDelete").disabled = true; // delete button of Timer disabled on page load

  document.getElementById("clockHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById(
      "stopwatchHeading"
    ).className = document
      .getElementById("stopwatchHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("clockHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Clock and hides Stopwatch and Timer
    toggleClock("block");
    toggleStopwatch("none");
    toggleTimer("none");
    // Clock is visible and Stopwatch-Timer is hidden
  };

  document.getElementById("stopwatchHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById("clockHeading").className = document
      .getElementById("clockHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("stopwatchHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Stopwatch and hides Clock and Timer
    toggleClock("none");
    toggleStopwatch("block");
    toggleTimer("none");
    // Stopwatch is visible and Clock-Timer is hidden
  };

  document.getElementById("timerHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById(
      "stopwatchHeading"
    ).className = document
      .getElementById("stopwatchHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("clockHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("timerHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Timer and hides Clock and Stopwatch
    toggleClock("none");
    toggleStopwatch("none");
    toggleTimer("block");
    // Timer is visible and Clock-Stopwatch
  };

  document.getElementById("stopwatchStartStop").onclick = () => {
    if (document.getElementById("stopwatchStartStop").innerHTML == "START") {
      startStopwatch();
    } else if (document.getElementById("stopwatchStartStop").innerHTML == "STOP") {
      stopStopwatch();
    }
  };

  document.getElementById("stopwatchReset").onclick = () => resetStopwatch();
  document.getElementById("stopwatchCountLap").onclick = () => createLap();


  document.getElementById("timerHour").value = "";
  document.getElementById("timerMinute").value = "";
  document.getElementById("timerSecond").value = "";

  document.getElementById("timerStartStop").onclick = () => {
    if (document.getElementById("timerStartStop").innerHTML == "START") {
      startTimer();
    } else if (document.getElementById("timerStartStop").innerHTML == "STOP") {
      stopTimer();
    }
  };

  document.getElementById("timerReset").onclick = () => resetTimer();
  document.getElementById("timerDelete").onclick = () => deleteTimer();
};

var controlStopwatch;
var lapCounter = 0;
var intervalID = null;
var stopwatchHour = Number(document.getElementById("stopwatchHour"));
var stopwatchMinute = Number(document.getElementById("stopwatchMinute"));
var stopwatchSecond = Number(document.getElementById("stopwatchSecond"));
var stopwatchMillisecond = Number(document.getElementById("stopwatchMillisecond"));

function controlStopwatch() {
  stopwatchMillisecond += 1;
  if (stopwatchMillisecond > 99) {
    stopwatchSecond += 1;
    stopwatchMillisecond = 0;
  }
  if (stopwatchSecond > 59) {
    stopwatchMinute += 1;
    stopwatchSecond = 0;
  }
  if (stopwatchMinute > 59) {
    stopwatchHour += 1;
    stopwatchMinute = 0;
  }
  if (stopwatchHour == 23 && stopwatchMinute == 59 && stopwatchSecond == 59 && stopwatchMillisecond == 59) {
    stopStopwatch();
    document.getElementById("stopwatchStartStop").disabled = true;
    document.getElementById("stopwatchPause").disabled = true;
    document.getElementById("stopwatchReset").disabled = false;
  }
  document.getElementById("stopwatchMillisecond").innerHTML = stopwatchMillisecond;
  document.getElementById("stopwatchSecond").innerHTML = stopwatchSecond;
  document.getElementById("stopwatchMinute").innerHTML = stopwatchMinute;
  document.getElementById("stopwatchHour").innerHTML = stopwatchHour;
}

function intervalManager(flag, controlStopwatch, time) {
  if (flag) intervalID = setInterval(controlStopwatch, time);
  else clearInterval(intervalID);
}

function startStopwatch() {
  intervalManager(true, controlStopwatch, 10);
  document.getElementById("stopwatchStartStop").innerHTML = "STOP";
  document.getElementById("stopwatchCountLap").disabled = false;
  document.getElementById("stopwatchReset").disabled = false;
}

function stopStopwatch() {
  intervalManager(false);
  document.getElementById("stopwatchStartStop").innerHTML = "START";
  document.getElementById("stopwatchStartStop").disabled = false;
  document.getElementById("stopwatchCountLap").disabled = true;
}

function resetStopwatch() {
  document.getElementById("stopwatchStartStop").innerHTML = "START";
  intervalManager(false);
  document.getElementById("stopwatchReset").disabled = true;
  document.getElementById("stopwatchStartStop").disabled = false;
  document.getElementById("stopwatchCountLap").disabled = true;
  lapCounter = 0;
  stopwatchHour = 0;
  stopwatchMinute = 0;
  stopwatchSecond = 0;
  stopwatchMillisecond = 0;
  document.getElementById("stopwatchHour").innerHTML = stopwatchHour;
  document.getElementById("stopwatchMinute").innerHTML = stopwatchMinute;
  document.getElementById("stopwatchSecond").innerHTML = stopwatchSecond;
  document.getElementById("stopwatchMillisecond").innerHTML = stopwatchMillisecond;
  document.getElementById("lap").innerHTML = "";
  var parent = document.getElementsByClassName("stopwatchButton")[0];
  var child = document.getElementsByClassName("lapWarning")[0];
  if (typeof child != "undefined" && child != null) {
    parent.removeChild(child);
  }
}

function createLap() {
  lapCounter++;
  if (lapCounter <= 24) {
    var content = document.createElement("div");
    content.className = "createdLap";
    var hash = document.createElement("span");
    hash.className = "hash";
    var hashContent = document.createTextNode("#" + lapCounter);
    hash.appendChild(hashContent);
    var lap = document.createElement("span");
    lap.className = "lapTime";
    var lapContent = document.createTextNode(stopwatchHour + ":" + stopwatchMinute + ":" + stopwatchSecond + ":" + stopwatchMillisecond);
    lap.appendChild(lapContent);
    content.appendChild(hash);
    content.appendChild(lap);

    var element = document.getElementById("lap");
    var sibling = document.getElementsByClassName("createdLap")[0];

    if (lapCounter <= 1) {
      element.appendChild(content);
    } else if (lapCounter <= 24) {
      element.insertBefore(content, sibling);
    }
  } else if (lapCounter == 25) {
    var warningContent = document.createElement("div");
    warningContent.className = "lapWarning";
    var node = document.createTextNode("Lap Counter Limit Reached");
    warningContent.appendChild(node);
    var element = document.getElementsByClassName("stopwatchButton")[0];
    element.appendChild(warningContent);
  }
}

// let val = "";
// const timerHourChange = (event) => {
//   if (event.target.value === '1' || event.target.value === '2' || event.target.value === '3' || event.target.value === '4' || event.target.value === '5' || event.target.value === '6' || event.target.value === '7' || event.target.value === '8' || event.target.value === '9' || event.target.value === '0') {
//     document.getElementById("timerHour").value += event.target.value;
//     console.log("true");
//   }
//   else {
//     document.getElementById("timerHour").value += "";
//     console.log("false");
//   }
//   console.log(val);
// };

// const timerHourChange = () => {
//   var x = document.getElementById("timerHour").value;
//   if (x == '1' || x == '2' || x == '3' || x == '4' || x == '5' || x == '6' || x == '7' || x == '8' || x == '9' || x == '0') {
//     document.getElementById("timerHour").value = x;
//   }
//   else {
//     console.log(typeof x);
//     document.getElementById("timerHour").value = null;
//   }
// }

function controlTimer() {
  const startTime = performance.now();
  timerMillisecond -= 1;
  if (timerMillisecond < 0) {
    timerSecond -= 1;
    timerMillisecond = timerMillisecondDefaultValue;
  }
  if (timerSecond < 0) {
    timerMinute -= 1;
    timerSecond = 59;
  }
  if (timerMinute < 0) {
    timerHour -= 1;
    timerMinute = 59;
  }
  if (timerHour == 0 && timerMinute == 0 && timerSecond == 0 && timerMillisecond == 0) {
    firstStartTimer = true;
    timerMillisecond = 99;
    resetTimer();
  }
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = timerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = timerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = timerHour;
  const endTime = performance.now();
  console.log(endTime - startTime);
}

var intervalIDTimer = null;
function intervalManagerTimer(flag, controlTimer, time) {
  if (flag) intervalIDTimer = setInterval(controlTimer, time);
  else clearInterval(intervalIDTimer);
}

var firstStartTimer = true;
var reset = false;
var timerHour = 0;
var timerMinute = 0;
var timerSecond = 0;
var timerMillisecond;
var timerMillisecondDefaultValue = 99;
var permanentTimerHour;
var permanentTimerMinute;
var permanentTimerSecond;

function startTimer() {
  document.getElementById("timerStartStop").innerHTML = "START";
  if (firstStartTimer) {
    var parent = document.getElementsByClassName("timerTime")[0];
    var child = document.getElementsByClassName("timerContent")[0];
    if (typeof child != "undefined" && child != null) {
      parent.removeChild(child);
    }

    document.getElementById("timerHour").disabled = true;
    document.getElementById("timerMinute").disabled = true;
    document.getElementById("timerSecond").disabled = true;

    firstStartTimer = false;
    timerHour = Number(document.getElementById("timerHour").value);
    timerMinute = Number(document.getElementById("timerMinute").value);
    timerSecond = Number(document.getElementById("timerSecond").value);
    timerMillisecond = 99;
    permanentTimerHour = timerHour;
    permanentTimerMinute = timerMinute;
    permanentTimerSecond = timerSecond;
    var timerContent = document.createElement("div");
    timerContent.className = "timerContent";

    var timerHourDisplay = document.createElement("div");
    timerHourDisplay.className = "timerHourDisplay";
    var timerHourDisplayContent = document.createTextNode(timerHour);
    timerHourDisplay.appendChild(timerHourDisplayContent);

    var timerMinuteDisplay = document.createElement("div");
    timerMinuteDisplay.className = "timerMinuteDisplay";
    var timerMinuteDisplayContent = document.createTextNode(timerMinute);
    timerMinuteDisplay.appendChild(timerMinuteDisplayContent);

    var timerSecondDisplay = document.createElement("div");
    timerSecondDisplay.className = "timerSecondDisplay";
    var timerSecondDisplayContent = document.createTextNode(timerSecond);
    timerSecondDisplay.appendChild(timerSecondDisplayContent);

    timerContent.appendChild(timerHourDisplay);
    timerContent.appendChild(timerMinuteDisplay);
    timerContent.appendChild(timerSecondDisplay);

    var timerElement = document.getElementsByClassName("timerTime")[0];
    timerElement.appendChild(timerContent);

  }
  if (timerHour == 0 && timerMinute == 0 && timerSecond == 0) {
    document.getElementById("timerStartStop").innerHTML = "START";
    firstStartTimer = true;
  }
  if (reset) {
    reset = false;
    timerMillisecond = timerMillisecondDefaultValue;
    timerHour = permanentTimerHour;
    timerMinute = permanentTimerMinute;
    timerSecond = permanentTimerSecond;
  }
  if (timerHour !== 0 || timerMinute !== 0 || timerSecond !== 0) {
    intervalManagerTimer(true, controlTimer, 10);
    document.getElementById("timerStartStop").innerHTML = "STOP";
  }
  document.getElementById("timerReset").disabled = false;
  document.getElementById("timerDelete").disabled = false;
}

function stopTimer() {
  intervalManagerTimer(false);
  document.getElementById("timerStartStop").innerHTML = "START";
}

function resetTimer() {
  reset = true;
  intervalManagerTimer(false);
  document.getElementById("timerStartStop").innerHTML = "START";
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = permanentTimerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = permanentTimerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = permanentTimerHour;
}

function deleteTimer() {
  intervalManagerTimer(false);
  timerMillisecond = timerMillisecondDefaultValue;
  timerHour = 0;
  timerMinute = 0;
  timerSecond = 0;
  firstStartTimer = true;
  document.getElementById("timerStartStop").innerHTML = "START";
  document.getElementById("timerReset").disabled = true;
  document.getElementById("timerDelete").disabled = true;

  document.getElementById("timerHour").disabled = false;
  document.getElementById("timerMinute").disabled = false;
  document.getElementById("timerSecond").disabled = false;

  var parent = document.getElementsByClassName("timerTime")[0];
  var child = document.getElementsByClassName("timerContent")[0];
  parent.removeChild(child);
}