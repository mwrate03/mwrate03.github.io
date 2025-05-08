const video = document.querySelector('#bg-video');
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// Add other functionalities here

const timerDisplay = document.querySelector("timer");
const startButton = document.querySelector("begin-countdown");
const pauseButton = document.querySelector("pause-countdown");
const resetButton = document.querySelector("reset-countdown");
const buttons = document.querySelectorAll(".start-btn");

let countdown;
let paused = false;
let timeLeft = 0;
let originalTime = 0; // Track the last selected time

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60); //sets up the minute (taking the timeleft in sec/ 60sec = 1 min)
  const secs = seconds % 60; //sets up the seconds (taking the % remainder seconds)
  timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`; //formats and changes timer display
}

function startTimer(seconds) {
  //creates a function that starts the timer
  clearInterval(countdown); //clears resets any outstanding timers
  timeLeft = seconds; // stores the current value in seconds

  updateDisplay(timeLeft); //immediately runs the function

  countdown = setInterval(() => {
    //setting up the variable countdown
    if (!paused) {
      timeLeft--; //Decrease remaining time by 1 second
      updateDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdown); //if timer hits 0, stop
      }
    }
  }, 1000);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearInterval(countdown);
    paused = false;
    originalTime = parseInt(btn.dataset.time); // Set originalTime
    timeLeft = originalTime;
    updateDisplay(originalTime);
    pauseButton.textContent = "Pause";
  });
});

//starts countdown from last saved time
startButton.addEventListener("click", () => {
  if (originalTime > 0) {
    startTimer(originalTime);
  }
});

//pauses countdown if there is time left.
pauseButton.addEventListener("click", () => {
  if (timeLeft > 0) {
    paused = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause"; //text changes when paused
  }
});

//resets the timer to the original time
resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  paused = false;
  timeLeft = originalTime; //setup in btn.addEventListener above
  updateDisplay(originalTime);
  pauseButton.textContent = "Pause";
});
