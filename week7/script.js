const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

//------------------------------------------------------------
// My logic for playing this sound
// first I need to fetch the right button to play

const playButton = document.querySelector("#play-button");
console.log(playButton);

// then i'll listen to the click events on that button
playButton.addEventListener("click", playAudio);

// whenever click happens, the audio plays
function playAudio() {
  airportAudio.play();
}
//------------------------------------------------------------

//------------------------------------------------------------
// My logic for playing this sound
// first I need to fetch the right button to pause

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// then i'll listen to the click events on that button
pauseButton.addEventListener("click", pauseAudio);

// whenever click happens, the audio pauses
function pauseAudio() {
  airportAudio.pause();
}
//------------------------------------------------------------

//------------------------------------------------------------
// My logic for playing this sound
// first I need to fetch the right button to pop
// and the sound that i want to use on click

const popSound = document.querySelector("#pop-sound");
console.log(popSound);

const popButton = document.querySelector("#pop-button");
console.log(popButton);

// then i'll listen to the click events on that button
popButton.addEventListener("click", popAudio);

// whenever click happens, the audio plays
function popAudio() {
  popSound.play();
}
//------------------------------------------------------------
