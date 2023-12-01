const elementUsername = document.querySelector(".user-info .username");
const elementReposContainer = document.querySelector(".repos .container");

elementUsername.focus();

const addMessageNoReposToShow = () => {
    const elementMessageNoReposToShow = document.createElement("div");
    elementMessageNoReposToShow.appendChild(document.createTextNode("No repositories to show"));
    elementMessageNoReposToShow.classList.add("message-no-repos-to-show");
    elementReposContainer.appendChild(elementMessageNoReposToShow);
};

document.querySelector(".user-info .button-fetch").onclick = () => {
    if (elementUsername.value === "") return;
    fetch(`https://api.github.com/users/${elementUsername.value}/repos`)
        .then(response => response.json())
        .then(response => {
            elementReposContainer.innerHTML = "";
            response.map(createRepoElementWithStarsCount).sort((repo1, repo2) => {
                if (repo2.starsCount < repo1.starsCount) return -1;
                if (repo1.starsCount < repo2.starsCount) return +1;
                return 0;
            })
                .forEach(({repo}) => elementReposContainer.appendChild(repo));
            if (elementReposContainer.children.length === 0)
                addMessageNoReposToShow();
        });
};

const createRepoElementWithStarsCount = (repo) => {
    const elementStarsCount = document.createElement("span");
    elementStarsCount.appendChild(
        document.createTextNode(
            `${repo.stargazers_count} star${repo.stargazers_count === 1 ? 's' : ''}`));
    const elementVisitLink = document.createElement("a");
    elementVisitLink.setAttribute("target", "_blank");
    elementVisitLink.setAttribute("href", repo.html_url);
    elementVisitLink.appendChild(document.createTextNode("Visit"));
    const elementRepo = document.createElement("div");
    elementRepo.appendChild(document.createTextNode(repo.name));
    elementRepo.appendChild(elementVisitLink);
    elementRepo.appendChild(elementStarsCount);
    elementRepo.classList.add("repo");
    return {repo: elementRepo, starsCount: repo.stargazers_count};
};