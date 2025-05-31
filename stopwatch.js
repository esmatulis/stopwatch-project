const startStopBtn = document.getElementById("start-stop");
const lapResetBtn = document.getElementById("lap-reset");
const timer = document.getElementById("timer");
let startTime = Date.now();
let elapsed = 0;
const lapList = document.getElementById("lap-list");

let isRunning = false;

function startStop() {
  isRunning = !isRunning;
  if (isRunning) {
    startStopBtn.textContent = "Stop";
    lapResetBtn.textContent = "Lap";
    startTime = Date.now() - elapsed;
    interval = setInterval(updateTimer, 10);
    // Start the stopwatch logic here
  }
  else {
    clearInterval(interval);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Reset";
    // Stop the stopwatch logic here
  }
}

function updateTimer() {
  elapsed = Date.now() - startTime;
  timer.innerText = formatTime(elapsed);
}

function formatTime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function lapReset() {
  if (isRunning) {
    // Logic to record a lap time
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.textContent = `Lap ${lapList.children.length + 1}`;
    div2.textContent = formatTime(elapsed);
    li.appendChild(div1);
    li.appendChild(div2);
    lapList.appendChild(li);
  } else {
    lapList.innerHTML = '';
    startTime = Date.now();
    elapsed = Date.now() - startTime;
    timer.innerText = formatTime(elapsed);
    // Logic to reset the stopwatch
  }
}

startStopBtn.addEventListener('click', startStop);

lapResetBtn.addEventListener('click', lapReset);