const newTaskTextElement = document.querySelector(".add-task-section input");
const tasksContainerElement = document.querySelector(".tasks-section .container");
const tasksCountElement = document.querySelector(".stats-section .tasks-count span");
const completedTasksCountElement = document.querySelector(".stats-section .completed-tasks-count span");
const messageNoTasksElement = document.querySelector(".tasks-section .no-tasks-message");

window.onload = () => newTaskTextElement.focus();

const onDeleteEvent = ({target: {parentElement: element}}) => {
    if (element.classList.contains("completed"))
        --completedTasksCountElement.innerText;
    element.remove();
    --tasksCountElement.innerText;
    if (tasksCountElement.innerText === "0")
        messageNoTasksElement.style.display = "block";
};

const onTaskClickEvent = ({target: element}) => {
    if (!element.classList.contains("task"))
        return;
    if (element.classList.contains("completed")) {
        --completedTasksCountElement.innerText;
        element.classList.remove("completed");
    } else {
        element.classList.add("completed");
        ++completedTasksCountElement.innerText;
    }
};

document.querySelector(".add-task-section .add").onclick = () => {
    if (newTaskTextElement.value === "")
        return;
    if (messageNoTasksElement.style.display !== "none")
        messageNoTasksElement.style.display = "none";
    const taskNameElement = document.createElement("span");
    taskNameElement.appendChild(document.createTextNode(newTaskTextElement.value));
    const taskDeleteElement = document.createElement("span");
    taskDeleteElement.appendChild(document.createTextNode("Delete"));
    taskDeleteElement.classList.add("delete");
    taskDeleteElement.onclick = onDeleteEvent;
    newTaskTextElement.value = "";
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(taskDeleteElement);
    taskElement.onclick = onTaskClickEvent;
    tasksContainerElement.appendChild(taskElement);
    ++tasksCountElement.innerText;
    newTaskTextElement.focus();
};
