/*----- Background Video Logic -----*/

// Select video and play/pause button elements
const video = document.querySelector("#bg-video");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");

// Toggle play/pause and update the button icon
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

/*----- Timer Setup -----*/

// Select timer elements
const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#begin-countdown");
const pauseButton = document.querySelector("#pause-countdown");
const resetButton = document.querySelector("#reset-countdown");
const buttons = document.querySelectorAll(".start-btn");

let countdown; // Stores the setInterval ID
let paused = false; // Tracks pause/resume state
let timeLeft = 0; // Time remaining in seconds
let originalTime = 0; // Last selected time

/*----- Timer Functions -----*/

// Update the display with mm:ss format
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

// Starts the countdown
function startTimer(seconds) {
  clearInterval(countdown); // Reset any existing timers
  timeLeft = seconds;
  updateDisplay(timeLeft); // Show the time immediately

  countdown = setInterval(() => {
    if (!paused) {
      timeLeft--;
      updateDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdown);
      }
    }
  }, 1000);
}

/*----- Button Event Logic -----*/

// When a time button is clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Only apply data-time logic to buttons that have a data-time attribute
    if (btn.dataset.time) {
      clearInterval(countdown);
      paused = false;
      originalTime = parseInt(btn.dataset.time);
      timeLeft = originalTime;
      updateDisplay(originalTime);
      pauseButton.textContent = "Pause";
    }
  });
});

// Start countdown from last selected time
startButton.addEventListener("click", () => {
  if (originalTime > 0 && !isNaN(originalTime)) {
    startTimer(originalTime);
  } else {
    alert("Please select a time first!");
  }
});

// Toggle pause/resume
pauseButton.addEventListener("click", () => {
  if (timeLeft > 0) {
    paused = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause";
  }
});

// Reset timer to original time
resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  paused = false;
  timeLeft = originalTime;
  updateDisplay(originalTime);
  pauseButton.textContent = "Pause";
});
