letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
           "J", "K", "L", "M", "N", "O", "P", "Q", "R",
           "S", "T", "U", "V", "W", "X", "Y", "Z"]

const words = new Map([
    ["Countries", ["Egypt", "United States", "France", "Germany"]],
    ["Planets", ["Uranus", "Neptune", "Earth", "Jupiter"]]
]);

const wordCategories = Array.from(words.keys());

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomElementArray = a => a[random(0, a.length - 1)];

const letterContainer = document.querySelector(".game-controls .container");
const categoryTextElement = document.querySelector("header .container .category .value");
const randomWordContainer = document.querySelector(".word .container");

const category = wordCategories[random(0, wordCategories.length - 1)];
const categoryWord = Array.from(randomElementArray(words.get(category)).toUpperCase());
let remainingLetters = categoryWord.length;
let checked = [];
categoryTextElement.innerHTML = category;

const draws = [
    document.querySelector(".game-draw .man-body .man-legs"),
    document.querySelector(".game-draw .man-body .man-hands"),
    document.querySelector(".game-draw .man-body"),
    document.querySelector(".game-draw .man-head"),
    document.querySelector(".game-draw .rope"),
    document.querySelector(".game-draw .stand")
]

categoryWord.forEach((_, i) => {
    checked.push(false);
    const letterElement = document.createElement("div");
    letterElement.className = "letter";
    if (categoryWord[i] === ' ') {
        letterElement.innerHTML = '_';
        --remainingLetters;
        checked[i] = true;
    }
    randomWordContainer.appendChild(letterElement);
});

letters.forEach(letter => {
    const letterElement = document.createElement("div");
    letterElement.className = "letter";
    letterElement.innerHTML = letter;
    letterElement.onclick = e => {
        play(e.target.innerHTML);
        e.target.onclick = null;
        e.target.classList.add("inactive-letter");
    }
    letterContainer.appendChild(letterElement);
});

const wordLetters = document.querySelectorAll(".word .container .letter");

function play(letter) {
    let played = false;
    wordLetters.forEach((l, i) => {
        if (checked[i] === true || categoryWord[i] !== letter)
            return;
        played = true;
        wordLetters[i].innerHTML = categoryWord[i];
        checked[i] = true;
        --remainingLetters;
    });
    if (remainingLetters === 0)
        setTimeout(() => {
            alert("You've won");
            location.reload();
        }, 0);
    if (played === true)
        return;
    if (draws.length === 0) {
        alert("You've lost");
        location.reload();
    }
    draws.pop().style.visibility = "visible";
}
