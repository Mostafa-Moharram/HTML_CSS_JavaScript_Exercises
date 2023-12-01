const elementCount = document.querySelector(".quiz-app .container .quiz-info .count");
const elementBulletsContainer = document.querySelector(".quiz-app .container .status .bullets");
const elementTimer = document.querySelector(".quiz-app .container .status .countdown");
const elementQuestionPrompt = document.querySelector(".quiz-app .container .prompt");
const elementQuestionChoicesContainer = document.querySelector(".quiz-app .container .question-area .choices-area");
const elementSubmitQuestion = document.querySelector(".quiz-app .container input[type=\"submit\"]");
const elementResultsContainer = document.querySelector(".quiz-app .container .results");
const elementQuestionArea = document.querySelector(".quiz-app .container .question-area");
const elementResultsArea = document.querySelector(".quiz-app .container .status");

let elementsBullets = [];
let currentQuestionIndex = 0, correctAnswersCount = 0;
let questions = null;

const finishQuiz = () => {
    elementQuestionArea.remove();
    elementSubmitQuestion.remove();
    elementResultsArea.remove();

    const elementAdj = document.createElement("span");
    if (2 * correctAnswersCount < questions.length) {
        elementAdj.appendChild(document.createTextNode("Bad"));
        elementAdj.className = "bad";
    } else if (correctAnswersCount == questions.length) {
        elementAdj.appendChild(document.createTextNode("Perfect"));
        elementAdj.className = "perfect";
    } else {
        elementAdj.appendChild(document.createTextNode("Good"));
        elementAdj.className = "good";
    }
    elementResultsContainer.classList.add("visible");
    elementResultsContainer.appendChild(elementAdj);
    elementResultsContainer.appendChild(
        document.createTextNode(` You got ${correctAnswersCount} out of ${questions.length}.`));
};

const setBulletsAndCounter = () => {
    if (questions === null || questions.length < 1)
        return;
    elementCount.innerText = questions.length;
    const tmp = document.createElement("div");
    tmp.className = "passed";
    elementBulletsContainer.appendChild(tmp);
    elementsBullets.push(tmp);
    for (let i = 1; i < questions.length; ++i) {
        const tmp = document.createElement("div");
        elementBulletsContainer.appendChild(tmp);
        elementsBullets.push(tmp);
    }
};

const createQuestionChoice = (choice, index) => {
    const elementInputRadio = document.createElement("input");
    elementInputRadio.setAttribute("type", "radio");
    elementInputRadio.setAttribute("id", `choice-${index}`);
    elementInputRadio.setAttribute("name", "choices");
    elementInputRadio.setAttribute("value", index);
    const elementLabel = document.createElement("label");
    elementLabel.setAttribute("for", elementInputRadio.getAttribute("id"));
    elementLabel.appendChild(document.createTextNode(choice));
    const elementChoice = document.createElement("div");
    elementChoice.className = "choice";
    elementChoice.appendChild(elementInputRadio);
    elementChoice.appendChild(elementLabel);
    return elementChoice;
};

const getCurrentSelectedRadioValue = () => {
    const choice = document.querySelector(".quiz-app .container .question-area .choices-area input[type=\"radio\"]:checked");
    return choice === null ? -1 : +choice.value;
};

const setQuestion = (index) => {
    elementQuestionPrompt.innerText = questions[index].prompt;
    elementQuestionChoicesContainer.innerHTML = "";
    questions[index].choices.forEach(
        (choice, i) => elementQuestionChoicesContainer.appendChild(createQuestionChoice(choice, i))
    );
};

fetch("questions.json").then(response => response.json()).then(quizQuestions => {
    questions = quizQuestions;
    setBulletsAndCounter();
    setQuestion(currentQuestionIndex);
});

elementSubmitQuestion.onclick = () => {
    const choiceValue = getCurrentSelectedRadioValue();
    correctAnswersCount += (choiceValue === questions[currentQuestionIndex].correct);
    ++currentQuestionIndex;
    if (currentQuestionIndex === questions.length) {
        finishQuiz();
    } else {
        setQuestion(currentQuestionIndex);
        elementsBullets[currentQuestionIndex].className = "passed";
    }
};

function Time(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    return this;
}

Time.prototype.subtractSecond = function() {
    if (this.seconds === 0) {
        --this.minutes;
        this.seconds = 59;
        return;
    } else --this.seconds;
};

Time.prototype.toString = function() {
    let ret = "";
    if (this.minutes < 10)
        ret += "0";
    ret += this.minutes;
    ret += ":";
    if (this.seconds < 10)
        ret += "0";
    ret += this.seconds;
    return ret;
};

const time = new Time(0, 5);
const timeoutQuestionSliding = 500;

elementTimer.innerText = time.toString();

const awaiter = (delayMilliSeconds) => {
    return new Promise(resolve => setTimeout(resolve, delayMilliSeconds));
};

const timerInterval = setInterval(async () => {
    time.subtractSecond();
    elementTimer.innerText = time.toString();
    if (time.minutes !== 0 || time.seconds !== 0)
        return;
    clearInterval(timerInterval);
    elementQuestionArea.style.pointerEvents = "none";
    elementSubmitQuestion.style.cursor = "default";
    const callback = elementSubmitQuestion.onclick;
    elementSubmitQuestion.onclick = null;
    while (currentQuestionIndex < questions.length) {
        await awaiter(300);
        callback();
    }
    await awaiter(timeoutQuestionSliding);
}, 1000);
