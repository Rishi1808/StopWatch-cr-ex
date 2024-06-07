let stopwatchInterval;
let stopwatchTime = 0;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startStopwatch') {
        startStopwatch();
    } else if (request.action === 'stopStopwatch') {
        stopStopwatch();
    } else if (request.action === 'resetStopwatch') {
        resetStopwatch();
    }
});

function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    // Communicate with the popup to update the display
    chrome.runtime.sendMessage({ action: 'updateStopwatchDisplay', time: stopwatchTime });
}
