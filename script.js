function toggleClock(visibility) {
  document.getElementsByClassName("formatMode")[0].style.display = visibility;
  document.getElementById("clock").style.display = visibility;
}

function toggleStopwatch(visibility) {
  document.getElementById("stopwatch").style.display = visibility;
}

function toggleTimer(visibility) {
  document.getElementById("timer").style.display = visibility;
}

window.onload = () => {
  document.getElementById("stopwatchReset").disabled = true; // reset button of Stopwatch disabled on page load
  document.getElementById("countLap").disabled = true; // lap button of Stopwatch disabled on page load

  document.getElementById("clockHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById("stopwatchHeading").className = document.getElementById("stopwatchHeading").className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document.getElementById("timerHeading").className.replace(/\bactive\b/g, "");
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
    document.getElementById("clockHeading").className = document.getElementById("clockHeading").className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document.getElementById("timerHeading").className.replace(/\bactive\b/g, "");
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
    document.getElementById("stopwatchHeading").className = document.getElementById("stopwatchHeading").className.replace(/\bactive\b/g, "");
    document.getElementById("clockHeading").className = document.getElementById("timerHeading").className.replace(/\bactive\b/g, "");
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
    }
    else if (document.getElementById("stopwatchStartStop").innerHTML == "STOP") {
      stopStopwatch();
    }
  }

  document.getElementById("stopwatchReset").onclick = () => resetStopwatch();
  document.getElementById("countLap").onclick = () => createLap();
};

function time() { // function for getting the hour, minute, second, date, month, day-name, year and printing them
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
    else if (hour < 1) document.getElementById("clockHour").innerHTML = hour + 12;
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
}

setInterval(() => { // function for updation of hour, minute, second, date, month, day-name, year every 1/10 second
  time();
}, 100);

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
  if (flag)
    intervalID = setInterval(controlStopwatch, time);
  else
    clearInterval(intervalID);
}

function startStopwatch() {
  intervalManager(true, controlStopwatch, 10);
  document.getElementById("stopwatchStartStop").innerHTML = "STOP";
  document.getElementById("countLap").disabled = false;
  document.getElementById("stopwatchReset").disabled = false;
}

function stopStopwatch() {
  intervalManager(false);
  document.getElementById("stopwatchStartStop").innerHTML = "START";
  document.getElementById("stopwatchStartStop").disabled = false;
  document.getElementById("countLap").disabled = true;
}

function resetStopwatch() {
  document.getElementById("stopwatchStartStop").innerHTML = "START";
  intervalManager(false);
  document.getElementById("stopwatchReset").disabled = true;
  document.getElementById("stopwatchStartStop").disabled = false;
  document.getElementById("countLap").disabled = true;
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
  if (typeof (child) != 'undefined' && child != null) {
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
    }
    else if (lapCounter <= 24) {
      element.insertBefore(content, sibling);
    }
  }
  else if (lapCounter == 25) {
    var warningContent = document.createElement("div");
    warningContent.className = "lapWarning";
    var node = document.createTextNode("Lap Counter Limit Reached");
    warningContent.appendChild(node);
    var element = document.getElementsByClassName("stopwatchButton")[0];
    element.appendChild(warningContent);
  }
}
