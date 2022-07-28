const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let count; 
function countDown(seconds) {
    
    if(count) clearInterval(count);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    count = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(count);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;

    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();

    endTime.textContent = `Be back at ${hours}:${mins < 10 ? '0' + mins : mins}`;
    // At english time
    /*
    if(hours > 12) hours = hours - 12;
    */
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    countDown(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const mins = this.minutes.value;
    countDown(mins * 60);
    this.reset();
});