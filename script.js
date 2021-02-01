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
  // function for updating hour, minute, second, date, month, day-name, year every 1/10 second executing time function every 1/10 second
  time();
}, 100);

const toggleClock = (visibility) => {
  // function to change the visibility of Clock div
  document.getElementsByClassName("formatMode")[0].style.display = visibility;
  document.getElementById("clock").style.display = visibility;
};

const toggleStopwatch = (visibility) => {
  // function to change the visibility of Stopwatch div
  document.getElementById("stopwatch").style.display = visibility;
};

const toggleTimer = (visibility) => {
  // function to change the visibility of Timer div
  document.getElementById("timer").style.display = visibility;
};

window.onload = () => {
  //function to execute following tasks on page load

  document.getElementById("clockHeading").className += "active"; // assigning active class to clockHeading div tag in header tag

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
    // function to execute startStopwatch function when Stopwatch Start/Stop button content is equal to START and execute stopStopwatch function when Stopwatch Start/Stop button content is equal to STOP
    if (document.getElementById("stopwatchStartStop").innerHTML == "START") {
      startStopwatch();
    } else if (document.getElementById("stopwatchStartStop").innerHTML == "STOP") {
      stopStopwatch();
    }
  };

  document.getElementById("stopwatchReset").onclick = () => resetStopwatch(); // to execute resetStopwatch function when clicked on Stopwatch reset button
  document.getElementById("stopwatchCountLap").onclick = () => createLap(); // to execute createLap function when clicked on Stopwatch count lap button

  document.getElementById("timerHour").value = "";
  document.getElementById("timerMinute").value = "";
  document.getElementById("timerSecond").value = "";
  //to assign the values of input to nothing when page is loaded

  document.getElementById("timerStartStop").onclick = () => {
    // function to fetch values from Timer inputs and execute startTimer function when Timer Start/Stop button content is equal to START and execute stopTimer function when Timer Start/Stop button content is equal to STOP and also generate an error if fetched values are not valid and also stopping anything from executing if values are not provided or values are equal to zero
    if (document.getElementById("timerStartStop").innerHTML == "START") {
      timerHour = Number(document.getElementById("timerHour").value);
      timerMinute = Number(document.getElementById("timerMinute").value);
      timerSecond = Number(document.getElementById("timerSecond").value);

      if (timerSecond >= 0 && timerMinute >= 0 && timerHour >= 0 && timerSecond <= 60 && timerMinute <= 60 && timerHour <= 99) {
        startTimer();
      }
      else {
        startTimerError();
      }
    } else if (document.getElementById("timerStartStop").innerHTML == "STOP") {
      stopTimer();
    }
  };

  document.getElementById("timerReset").onclick = () => resetTimer(); // to execute resetTimer function when clicked on Timer reset button
  document.getElementById("timerDelete").onclick = () => deleteTimer(); // to execute resetDelete function when clicked on Timer delete button
};

// followings are all the variables which are used in following functions for running the Stopwatch
var controlStopwatch;
var lapCounter = 0;
var intervalID = null;
var stopwatchHour = 0;
var stopwatchMinute = 0;
var stopwatchSecond = 0;
var stopwatchMillisecond = 0;

function controlStopwatch() {
  // function to control the Stopwatch by the main Stopwatch logic of decreasing and assigning values to seconds, minutes and hours and stops when Stopwatch is equal to certain values in milliseconds, seconds, minutes and hours
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
  // function to handle the interval function which is mainly responsible for starting and stopping the Stopwatch
  if (flag) intervalID = setInterval(controlStopwatch, time);
  else clearInterval(intervalID);
}

function startStopwatch() {
  // function to start stopwatch after checking the values and assign STOP value to Stopwatch Start/Stop button
  intervalManager(true, controlStopwatch, 10);
  document.getElementById("stopwatchStartStop").innerHTML = "STOP";
  document.getElementById("stopwatchCountLap").disabled = false;
  document.getElementById("stopwatchReset").disabled = false;
}

function stopStopwatch() {
  // function to stop Stopwatch and assign START value to Stopwatch Start/Stop button
  intervalManager(false);
  document.getElementById("stopwatchStartStop").innerHTML = "START";
  document.getElementById("stopwatchStartStop").disabled = false;
  document.getElementById("stopwatchCountLap").disabled = true;
}

function resetStopwatch() {
  // function to reset Stopwatch to its initial state and assign START value to Stopwatch Start/Stop button
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
  // function to create lap by creating nodes assigning them the data retrieved from Stopwatch and appending them to parent node and checking and stopping with alert message if they are more than the 24
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

function timerValidationHandler(event) {
  // function to only return numeric values to input tag
  return event.charCode >= 48 && event.charCode <= 57
}

function timerInputLimitHandler() {
  // function to restrict user to input more than 2 characters in input tag
  if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
}

document.getElementById("timerHour").addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerHour input tag
document.getElementById("timerMinute").addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerMinute input tag
document.getElementById("timerSecond").addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerSecond input tag

// followings are all the variables which are used in following functions for running the Timer
var intervalIDTimer = null;
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

var audio = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration) {
  // function to create a beep sound according to the passed arguements in beep function
  var oscillator = audio.createOscillator()
  var gain = audio.createGain()
  oscillator.connect(gain)
  oscillator.frequency.value = freq
  oscillator.type = "square"
  gain.connect(audio.destination)
  gain.gain.value = vol * 0.01
  oscillator.start(audio.currentTime)
  oscillator.stop(audio.currentTime + duration * 0.001)
}

function controlTimer() {
  // function to control the Timer by the main Timer logic of decreasing and assigning values to seconds, minutes and hours and stops when Timer is equal to 0 values in seconds, minutes and hours and generate beep sound
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
  if (timerHour == 0 && timerMinute == 0 && timerSecond == 0) {
    beep(100, 520, 200);
    firstStartTimer = true;
    timerMillisecond = 99;
    resetTimer();
  }
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = timerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = timerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = timerHour;
}

function intervalManagerTimer(flag, controlTimer, time) {
  // function to handle the interval function which is mainly responsible for starting and stopping the Timer
  if (flag) intervalIDTimer = setInterval(controlTimer, time);
  else clearInterval(intervalIDTimer);
}

function startTimer() {
  // function to start Timer after checking the values and assign STOP value to Timer Start/Stop button
  if (firstStartTimer) {
    var parent = document.getElementsByClassName("timerTime")[0];
    var child1 = document.getElementsByClassName("timerContent")[0];
    var child2 = document.getElementsByClassName("timerErrorDisplay")[0];

    if (typeof child1 != "undefined" && child1 != null) {
      parent.removeChild(child1);
    }

    if (typeof child2 != "undefined" && child2 != null) {
      parent.removeChild(child2);
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
    document.getElementById("timerHour").disabled = false;
    document.getElementById("timerMinute").disabled = false;
    document.getElementById("timerSecond").disabled = false;
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
  // function to stop Timer and assign START value to Timer Start/Stop button
  intervalManagerTimer(false);
  document.getElementById("timerStartStop").innerHTML = "START";
}

function resetTimer() {
  // function to reset Timer to its initial state when the Timer was started at its first place
  reset = true;
  intervalManagerTimer(false);
  document.getElementById("timerStartStop").innerHTML = "START";
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = permanentTimerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = permanentTimerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = permanentTimerHour;
  document.getElementById("timerHour").disabled = false;
  document.getElementById("timerMinute").disabled = false;
  document.getElementById("timerSecond").disabled = false;
}

function deleteTimer() {
  // function to stop Timer and delete if any node exists which is supposed to be deleted
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
  if (typeof child != "undefined" && child != null) {
    parent.removeChild(child);
  }
}

function startTimerError() {
  // function which generates an error and deletes if any error/timer div/node exists on its place where it is supposed to be printed according to certain conditions after creating a new div/node to print
  var errorMessage;
  var parent = document.getElementsByClassName("timerTime")[0];
  var child1 = document.getElementsByClassName("timerContent")[0];
  var child2 = document.getElementsByClassName("timerErrorDisplay")[0];

  if (typeof child1 != "undefined" && child1 != null) {
    parent.removeChild(child1);
  }

  if (typeof child2 != "undefined" && child2 != null) {
    parent.removeChild(child2);
  }

  if (timerSecond > 60 || timerMinute > 60 || timerHour > 99) {
    errorMessage = "Error: Value Exceeded";
  } else
    if (timerSecond < 0 || timerMinute < 0 || timerHour < 0) {
      errorMessage = "Error: Inferior Value";
    } else {
      errorMessage = "Error";
    }

  var timerErrorDisplay = document.createElement("div");
  timerErrorDisplay.className = "timerErrorDisplay";
  var timerErrorContent = document.createTextNode(errorMessage);
  var linebreak = document.createElement('br');
  var timerErrorContent2 = document.createTextNode("Enter A Valid Value");
  timerErrorDisplay.appendChild(timerErrorContent);
  timerErrorDisplay.appendChild(linebreak);
  timerErrorDisplay.appendChild(timerErrorContent2);

  var timerElement = document.getElementsByClassName("timerTime")[0];
  timerElement.appendChild(timerErrorDisplay);
}