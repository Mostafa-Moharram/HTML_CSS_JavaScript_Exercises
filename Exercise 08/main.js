const words = [
    "Hello",
    "Programming",
    "Code",
    "JavaScript",
    "Town",
    "Country",
    "Testing",
    "YouTube",
    "LinkedIn",
    "Twitter",
    "GitHub",
    "LeetCode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
]

const levels = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

let currentLevel = "Normal";

const buttonStart = document.querySelector(".game .game-start");
// const elementCurrentLevel = document.querySelector(".game .game-level .level");
const elementSelectLevel = document.querySelector(".game .game-level select");
const elementCurrentTime = document.querySelector(".game .game-level .time-seconds");
const elementWordToType = document.querySelector(".game .word");
const elementWordInput = document.querySelector(".game input");
const elementUpcomingWordsContainer = document.querySelector(".game .upcoming-words");
const elementTimeLeft = document.querySelector(".game .status .time-left span");
const elementUserScore = document.querySelector(".game .status .score .got");
const elementFullScore = document.querySelector(".game .status .score .total");
const elementFinishMessage = document.querySelector(".game .finish");

// elementCurrentLevel.innerHTML = currentLevel;
elementCurrentTime.innerHTML = levels[currentLevel];
elementFullScore.innerHTML = words.length;
elementWordInput.onpaste = () => false;

const setVisibleLevels = () => {
    const levelNames = Object.keys(levels);
    for (let i = 0; i < levelNames.length; ++i) {
        const elementOption = document.createElement("option");
        elementOption.appendChild(document.createTextNode(levelNames[i]));
        elementOption.setAttribute("value", levelNames[i]);
        if (levelNames[i] === currentLevel)
            elementOption.selected = true;
        elementSelectLevel.appendChild(elementOption);
    }
};

const fetchWord = () => {
    const wordIndex = Math.floor(Math.random() * words.length);
    elementWordToType.innerHTML = words[wordIndex];
    words.splice(wordIndex, 1);
    rebuildUpcomingWordsContainer();
};

const rebuildUpcomingWordsContainer = () => {
    elementUpcomingWordsContainer.innerHTML = "";
    words.forEach((word) => {
        const wordHolder = document.createElement("div");
        wordHolder.appendChild(document.createTextNode(word));
        elementUpcomingWordsContainer.appendChild(wordHolder);
    });
};

const startGame = () => {
    buttonStart.remove();
    elementWordInput.focus();
    fetchWord();
    timer.start();
};

function Timer(timeSeconds) {
    this.timeSeconds = timeSeconds;
};

Timer.prototype.start = function() {
    if (this.timeSeconds <= 0 || !this.onTimeSecondFinish)
        return;
    this.onTimeSecondFinish();
    this.intervalId = setInterval(() => {
        --this.timeSeconds;
        if (this.timeSeconds <= 0)
            clearInterval(this.intervalId);
        this.onTimeSecondFinish();
        if (this.timeSeconds <= 0 && this.onTimerFinishes)
            this.onTimerFinishes();
    }, 1000);
    return this.intervalId;
};

Timer.prototype.stop = function() {
    clearInterval(timer.intervalId);
};

const timer = new Timer(levels[currentLevel]);

timer.onTimeSecondFinish = function() {
    elementTimeLeft.innerHTML = this.timeSeconds;
};

elementWordInput.oninput = function() {
    if (this.value !== elementWordToType.innerHTML)
        return;
    timer.stop();
    ++elementUserScore.innerHTML;
    this.value = "";
    if (words.length === 0) {
        gameEnd(); return;
    }
    timer.timeSeconds = levels[currentLevel];
    fetchWord();
    timer.start();
};

const gameEnd = () => {
    elementWordInput.oninput = null;
    const element = document.createElement("span");
    if (words.length === 0) {
        element.appendChild(document.createTextNode("Congratulations!"));
        element.className = "good";
    } else {
        element.appendChild(document.createTextNode("Game Over"));
        element.className = "bad";
    }
    elementFinishMessage.appendChild(element);
};

setVisibleLevels();

timer.onTimerFinishes = gameEnd;

buttonStart.onclick = startGame;

elementSelectLevel.onchange = function() {
    currentLevel = this.value;
    elementCurrentTime.innerHTML = levels[currentLevel];
};

window.onkeyup = (e) => {
    if (e.key !== "Enter")
        return;
    window.onkeyup = null;
    startGame();
}