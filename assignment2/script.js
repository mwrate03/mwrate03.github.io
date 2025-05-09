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

let countdown; // Needed to control the countdown (like stop or reset)
let paused = false; // Tells us if the timer is paused or not
let timeLeft = 0; // How many seconds left on the timer
let originalTime = 0; // The time that was first chosen


/*----- Timer Functions -----*/

// Show the time in 00:00 format
function updateDisplay(seconds) {
  let mins = Math.floor(seconds / 60); // Get the minutes
  let secs = seconds % 60;             // Get the leftover seconds

  // Add a zero in front if the number is less than 10
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;

  // Show the time on the screen
  timerDisplay.textContent = mins + ":" + secs;
}

// Start counting down
function startTimer(seconds) {
  clearInterval(countdown);      // Stop any timer that was already running
  timeLeft = seconds;            // Set how much time we want to count down from
  updateDisplay(timeLeft);       // Show the starting time

  // Start the countdown
  countdown = setInterval(() => {
    if (!paused) {
      timeLeft--;                // Take away one second
      updateDisplay(timeLeft);   // Update the screen
      if (timeLeft <= 0) {
        clearInterval(countdown); // Stop the timer when it hits 0
      }
    }
  }, 1000); // Runs every second (1000 milliseconds)
}

// Go through each timer button (Pomodoro, Short Break, Long Break)
for (let i = 0; i < buttons.length; i++) {
  let btn = buttons[i];

  btn.addEventListener("click", function () {
    // Only run this if the button has a "data-time" attribute
    if (btn.getAttribute("data-time")) {
      clearInterval(countdown); // Stop any timer that's running
      paused = false; // Reset pause state

      // Get the time (in seconds) from the button and convert it to a number
      originalTime = parseInt(btn.getAttribute("data-time"));
      timeLeft = originalTime; // Save the selected time

      updateDisplay(originalTime); // Show the new time on screen
      pauseButton.textContent = "Pause"; // Set pause button back to default
    }
  });
}

// When "Start Timer" button is clicked
startButton.addEventListener("click", function () {
  // Make sure a time was selected first
  if (!isNaN(originalTime) && originalTime > 0) {
    startTimer(originalTime); // Start the countdown
  } else {
    alert("Please select a time first!"); // Show's a warning message if no time was picked
  }
});

// When "Pause" button is clicked
pauseButton.addEventListener("click", () => {
  if (timeLeft > 0) {
    paused = !paused; // Switch between pause and resume
    pauseButton.textContent = paused ? "Resume" : "Pause"; // Change button text
  }
});

// When "Reset" button is clicked
resetButton.addEventListener("click", () => {
  clearInterval(countdown); // Stop the timer
  paused = false; // Reset pause state
  timeLeft = originalTime; // Go back to the starting time
  updateDisplay(originalTime); // Show it on screen
  pauseButton.textContent = "Pause"; // Reset pause button text
});

/* How I learned this:
setInterval() & clearInterval() - https://www.w3schools.com/js/js_timing.asp
Creating a countdown timer with setInterval() - https://www.youtube.com/watch?v=x7WJEmxNlEs&ab_channel=FlorinPop
*/ 