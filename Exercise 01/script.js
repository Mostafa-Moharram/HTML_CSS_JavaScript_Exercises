let currentlySelectedIndex = 0;
const indicators = document.querySelectorAll(".slider .controls .indicators li");
const images = document.querySelectorAll(".slider .image-container img");
const slideNumber = document.querySelector(".slider .image-container .slide-number");
const prevButton = document.querySelector(".slider .controls .prev");
const nextButton = document.querySelector(".slider .controls .next");
const onIndicatorPressedEvent = ({target: indicator}) => {
    index = indicator.innerHTML - 1;
    if (index === currentlySelectedIndex)
        return;
    changeActive(index - currentlySelectedIndex);
    currentlySelectedIndex = index;
}
const changeNumber = (number) => slideNumber.innerHTML = `Slide #${number} of ${indicators.length}`;
const changeActive = (number) => {
    if (currentlySelectedIndex === 0)
        prevButton.classList.remove("inactive");
    if (currentlySelectedIndex + 1 === indicators.length)
        nextButton.classList.remove("inactive");
    indicators[currentlySelectedIndex].classList.remove("active");
    images[currentlySelectedIndex].classList.remove("active");
    currentlySelectedIndex += number;
    images[currentlySelectedIndex].classList.add("active");
    indicators[currentlySelectedIndex].classList.add("active");
    changeNumber(currentlySelectedIndex + 1);
    if (currentlySelectedIndex === 0)
        prevButton.classList.add("inactive");
    if (currentlySelectedIndex + 1 == indicators.length)
        nextButton.classList.add("inactive");
}

prevButton.classList.add("inactive");
changeNumber(currentlySelectedIndex + 1);

prevButton.onclick = () => changeActive(-1);

nextButton.onclick = () => changeActive(+1);

indicators.forEach(element => element.onclick = onIndicatorPressedEvent);