let timer;
let timeLeft = 30; // Timer duration
let isTyping = false;
let textToType = "Type this text to test your typing speed. Keep typing until the time runs out.";
let currentIndex = 0;
let correctCharacters = 0;
let incorrectCharacters = 0;

const textOptions = {
    default: "Type this text to test your typing speed. Keep typing until the time runs out.",
    quotes: "The only way to do great work is to love what you do. - Steve Jobs",
    random: "In the middle of every difficulty lies opportunity. - Albert Einstein"
};

document.addEventListener("DOMContentLoaded", () => {
    displayText();
    document.getElementById("user-input").addEventListener("input", handleTyping);
    document.getElementById("resetBtn").addEventListener("click", resetGame);
    document.getElementById("darkModeBtn").addEventListener("click", toggleDarkMode);
    document.getElementById("text-selector").addEventListener("change", changeText);
    displayLeaderboard();
});

function displayText() {
    const textDisplay = document.getElementById("text-to-type");
    textDisplay.innerHTML = textToType.split('').map((char, index) => {
        return `<span id="char-${index}" class="${index === currentIndex ? 'active' : ''}">${char}</span>`;
    }).join('');
}

function handleTyping() {
    const userInput = document.getElementById("user-input");
    const userValue = userInput.value;

    if (!isTyping) {
        isTyping = true;
        startTimer();
    }

    const textDisplay = document.getElementById("text-to-type");
    const characters = textToType.split('');

    // Update progress bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = (userValue.length / textToType.length) * 100 + "%";

    if (userValue.length > textToType.length) return;

    for (let i = 0; i < userValue.length; i++) {
        const charElement = document.getElementById(`char-${i}`);
        if (userValue[i] === characters[i]) {
            charElement.classList.add('correct');
            correctCharacters++;
        } else {
            charElement.classList.add('incorrect');
            incorrectCharacters++;
            playSound('error-sound'); // Play error sound
        }
    }

    currentIndex = userValue.length;
    displayText();
    updateStats();
}

function updateStats() {
    const wpmValue = Math.round((correctCharacters / 5) / (30 - timeLeft) * 60) || 0; // WPM calculation
    const accuracyValue = Math.round((correctCharacters / (correctCharacters + incorrectCharacters)) * 100) || 100;

    document.getElementById("wpm-value").textContent = wpmValue;
    document.getElementById("accuracy-value").textContent = accuracyValue;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("user-input").disabled = true;
            playSound('complete-sound'); // Play complete sound
            saveScore();
        } else {
            timeLeft--;
            document.getElementById("time").textContent = timeLeft;
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 30;
    currentIndex = 0;
    correctCharacters = 0;
    incorrectCharacters = 0;
    isTyping = false;
    document.getElementById("user-input").value = '';
    document.getElementById("user-input").disabled = false;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("wpm-value").textContent = 0;
    document.getElementById("accuracy-value").textContent = 100;
    document.getElementById("progress-bar").style.width = "0%";
    displayText();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function changeText(event) {
    textToType = textOptions[event.target.value];
    resetGame();
}

function saveScore() {
    const score = {
        wpm: document.getElementById("wpm-value").textContent,
        accuracy: document.getElementById("accuracy-value").textContent,
        date: new Date().toLocaleString()
    };

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `WPM: ${entry.wpm}, Accuracy: ${entry.accuracy}%, Date: ${entry.date}`;
        leaderboardList.appendChild(li);
    });
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
}
