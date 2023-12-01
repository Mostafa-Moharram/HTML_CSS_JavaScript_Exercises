document.querySelector(".game-controls .start-button").onclick = () => {
    let name = prompt("Enter your name");
    if (name === null || name === "") name = "Unknown";
    document.querySelector(".main-info .name-section .name").innerText = name;
    document.querySelector(".game-controls").remove();
};

const mainInfoTrialsNumber = document.querySelector(".main-info .wrong-section .trials");
const choicesHolderElement = document.querySelector(".choices .container .holder");
const flippingDuration = 800;

const cards = document.querySelectorAll(".choices .card");
const permutation = ((length) => {
    let permutation = [...Array(length).keys()];
    for (let i = 0; i < length; ++i) {
        let j = Math.floor(Math.random() * length);
        const tmp = permutation[i];
        permutation[i] = permutation[j];
        permutation[j] = tmp;
    }
    return permutation;
})(cards.length);

let flippedCards = []

const onElementClickEventHandler = (element) => {
    setTimeout(() => choicesHolderElement.classList.remove("disable"), flippingDuration / 2);
    if (flippedCards[1] < flippedCards[0]) {
        const tmp = flippedCards[0];
        flippedCards[0] = flippedCards[1];
        flippedCards[1] = tmp;
    }
    if (flippedCards[0] % 2 !== 0 || flippedCards[0] + 1 !== flippedCards[1]) {
        flippedCards.forEach(i => cards[i].classList.remove("flipped"));
        ++mainInfoTrialsNumber.innerText;
    }
    flippedCards = [];
};

cards.forEach((element, i) => {
    element.style.order = permutation[i];
    element.onclick = ({currentTarget: eventElement}) => {
        element.classList.add("flipped");
        flippedCards.push(i);
        if (flippedCards.length < 2)
            return;
        choicesHolderElement.classList.add("disable");
        setTimeout(onElementClickEventHandler, flippingDuration / 2, eventElement);
    };
});