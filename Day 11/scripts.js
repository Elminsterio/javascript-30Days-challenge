const fullScreenButton = document.querySelector('[title=FullScreen]');
const video = document.querySelector('.player__video'); 
const progressBarFilled = document.querySelector('.progress__filled'); 
const progressBar = document.querySelector('.progress');
const play = document.querySelector('.player__button');
const volume = document.querySelector('.player__controls input[name=volume]');
const playbackRate = document.querySelector('.player__controls input[name=playbackRate]');
const skipButtons = document.querySelectorAll('[data-skip]');

let videoPlayDuration;

function playAndPause() {
  video.paused ? video.play() : video.pause(); 
}

function onScrub(ev) {
  const dragTime = (ev.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = dragTime;
}

function handleProgress() {
  const { currentTime, duration } = video;
  const actualProgress = (currentTime * 100) / duration;
  progressBarFilled.style.flexBasis = actualProgress + '%';
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  play.textContent = icon;
}

function skipTime() {
  const { skip } = this.dataset;
  video.currentTime += parseFloat(skip); 
}

function getFullScreen(ev) {
  console.log(ev)
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

video.addEventListener('click', playAndPause);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

play.addEventListener('click', playAndPause);

let mousedown;
progressBar.addEventListener('click', onScrub);
progressBar.addEventListener('mousemove', (ev) => mousedown && onScrub(ev));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);

volume.addEventListener('input', ev => {
  const volumeLevel = ev.target.value;
  video.volume = volumeLevel;
});

playbackRate.addEventListener('input', ev => {
  const playbackRateLevel = ev.target.value;
  video.playbackRate = playbackRateLevel;
});

skipButtons.forEach(skipButton => {
  skipButton.addEventListener('click', skipTime)
});

fullScreenButton.addEventListener('click', getFullScreen)
