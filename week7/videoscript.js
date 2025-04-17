const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//------------------------------------------------------------
// My logic for playing this video
// first I need to fetch the right button to play

const playButton = document.querySelector("#play-button");
console.log(playButton);

// then i'll listen to the click events on that button
playButton.addEventListener("click", playVideo);

// whenever click happens, the video plays
function playVideo() {
  myVideo.play();
}
//------------------------------------------------------------

//------------------------------------------------------------
// My logic for playing this video
// first I need to fetch the right button to pause

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// then i'll listen to the click events on that button
pauseButton.addEventListener("click", pauseVideo);

// whenever click happens, the video pauses
function pauseVideo() {
  myVideo.pause();
}
//------------------------------------------------------------
