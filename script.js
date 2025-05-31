let startTime, interval;
let running = false;
let elapsed = 0;
let laps = [];

const display = document.getElementById('display');
const toggleBtn = document.getElementById('toggle');
const lapResetBtn = document.getElementById('lap-reset');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

function toggleStartStop() {
  if (running) {
    // Stop
    running = false;
    clearInterval(interval);
    toggleBtn.textContent = 'Start';
    lapResetBtn.textContent = 'Reset';
  } else {
    // Start
    running = true;
    startTime = Date.now() - elapsed;
    interval = setInterval(updateDisplay, 10);
    toggleBtn.textContent = 'Stop';
    lapResetBtn.textContent = 'Lap';
  }
}

function resetStopwatch() {
  running = false;
  clearInterval(interval);
  elapsed = 0;
  display.textContent = '00:00:00';
  toggleBtn.textContent = 'Start';
  laps = [];
  renderLaps();
  localStorage.removeItem('laps');
}

function addLap() {
  if (!running) {
    resetStopwatch();
  }
  else {
  const lapTime = formatTime(elapsed);
  laps.push(lapTime);
  saveLaps();
  renderLaps();
}
}

function renderLaps() {
  lapList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
div1.textContent = `Lap ${index + 1}:`;
div2.textContent = `${lap}`;
li.appendChild(div1);
li.appendChild(div2);
    // li.textContent = `Lap ${index + 1}: ${lap}`;
    lapList.appendChild(li);
  });
}

function saveLaps() {
  localStorage.setItem('laps', JSON.stringify(laps));
}

function loadLaps() {
  const stored = localStorage.getItem('laps');
  if (stored) {
    laps = JSON.parse(stored);
    renderLaps();
  }
}

// Event listeners
toggleBtn.addEventListener('click', toggleStartStop);
lapResetBtn.addEventListener('click', addLap);

// Load saved laps on page load
loadLaps();
