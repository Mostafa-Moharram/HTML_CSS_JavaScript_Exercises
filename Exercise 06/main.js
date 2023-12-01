const elementStorageItemText = document.querySelector(".parent .container input");
const buttonCheckItem = document.querySelector(".parent .container .buttons div:nth-child(1)");
const buttonAddItem = document.querySelector(".parent .container .buttons div:nth-child(2)");
const buttonDeleteItem = document.querySelector(".parent .container .buttons div:nth-child(3)");
const buttonShowItem = document.querySelector(".parent .container .buttons div:nth-child(4)");
const elementResultsContainer = document.querySelector(".parent .container .results");
elementStorageItemText.focus();

buttonCheckItem.onclick = () => {
    const key = elementStorageItemText.value;
    if (key === "")
        return;
    const value = localStorage.getItem(key);
    if (value === null) 
        elementResultsContainer.innerHTML = `<div class="heading">${key} cannot be found in Local Storage</div>`; 
    else
        elementResultsContainer.innerHTML = `<div class="heading">${key} is found associated with value ${value}</div>`;
};

buttonAddItem.onclick = () => {
    const key = elementStorageItemText.value;
    const value = "Text";
    if (key === "")
        return;
    localStorage.setItem(key, value);
    elementResultsContainer.innerHTML = `<div class="heading">${key} is added with value = ${value}</div>`;
};

buttonDeleteItem.onclick = () => {
    const key = elementStorageItemText.value;
    if (key === "")
        return;
    const value = localStorage.getItem(key);
    if (value === null)
        elementResultsContainer.innerHTML = `<div class="heading">${key} doesn't exist</div>`; 
    else {
        localStorage.removeItem(key);
        elementResultsContainer.innerHTML = `<div class="heading">${key} is deleted</div>`;
    }
};

buttonShowItem.onclick = () => {
    elementResultsContainer.innerHTML = "";
    for (const [key, value] of Object.entries(localStorage)) {
        elementResultsContainer.innerHTML +=
        `<div class="heading">${key} ${value}</div>`;
    }
};