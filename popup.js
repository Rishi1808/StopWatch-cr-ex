// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateStopwatchDisplay') {
        // Update the stopwatch display in the popup
        document.getElementById('stopwatchDisplay').textContent = formatTime(request.time);
    }
});

// Functions for controlling the stopwatch
document.getElementById('startStopwatch').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startStopwatch' });
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopStopwatch' });
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetStopwatch' });
});

function formatTime(timeInSeconds) {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('redirectLink').addEventListener('click', function(event) {
    event.preventDefault();
    const url = this.href;
    chrome.tabs.create({ url: url });
  });
});
