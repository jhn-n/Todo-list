import "./style.css";
import { Workspace } from "./classes.js";
import { loadProjects, saveProjects, clearProjects, deleteSavedProjects } from "./storage.js";
import { endOfTomorrow, format } from "date-fns";

const container = document.querySelector(".container");
const itemDialog = document.querySelector("#itemDialog");
const itemForm = document.querySelector("#itemForm");
const formTitle = document.querySelector("#formTitle");
const formDescription = document.querySelector("#formDescription");
const formDueDate = document.querySelector("#formDueDate");
const formPriorityHigh = document.querySelector("#formPriorityHigh");
const formPriorityMedium = document.querySelector("#formPriorityMedium");
const formPriorityLow = document.querySelector("#formPriorityLow");
const formCompleted = document.querySelector("#formCompleted");
const formUncompleted = document.querySelector("#formUncompleted");
const itemSubmitButton = document.querySelector("#submitButton");
const itemCancelButton = document.querySelector("#cancelButton");
const projectDialog = document.querySelector("#projectDialog");
const projectForm = document.querySelector("#projectForm");
const addProjectButton = document.querySelector("#addProjectButton");
const projectSubmitButton = document.querySelector("#projectSubmitButton");
const projectCancelButton = document.querySelector("#projectCancelButton");

const myUser = new Workspace("John");
startUp(myUser);

projectSubmitButton.addEventListener("click", (event) => {
    if (projectSubmitButton.dataset.editNotAdd === "true") {
        myUser.editProject(formName.value, projectSubmitButton.dataset.projectId);
    } else {
        myUser.addProject(formName.value);
    }
    event.preventDefault();
    projectForm.reset();
    projectDialog.close();
    display(myUser);
    saveProjects(myUser);
});

projectCancelButton.addEventListener("click", () => {
    projectForm.reset();
    projectDialog.close();
});

itemSubmitButton.addEventListener("click", (event) => {
    const completedLevel = formCompleted.checked ? "yes" : "no";
    const priorityLevel = formPriorityHigh.checked
        ? "high"
        : formPriorityMedium.checked
          ? "medium"
          : "low";
    if (itemSubmitButton.dataset.editNotAdd === "true") {
        myUser.editItem(
            formTitle.value,
            formDescription.value,
            formDueDate.value,
            priorityLevel,
            completedLevel,
            itemSubmitButton.dataset.projectId,
            itemSubmitButton.dataset.itemId,
        );
    } else {
        myUser.addItem(
            formTitle.value,
            formDescription.value,
            formDueDate.value,
            priorityLevel,
            completedLevel,
            itemSubmitButton.dataset.projectId,
        );
    }
    event.preventDefault();
    itemForm.reset();
    itemDialog.close();
    display(myUser);
    saveProjects(myUser);
});

itemCancelButton.addEventListener("click", () => {
    itemForm.reset;
    itemDialog.close();
});

function startUp(user) {
    if (!loadProjects(user)) {
        addExamples(user);
    }

    // saveProjects(user);
    // clearProjects(user);
    // loadProjects(user);
    display(user);
}

function addExamples(user) {
    user.addProject("Default");
    user.addProject("Alternative");

    user.projects[0].addItem("Hair cut", "Go to hairdressers", "2025/7/13", "medium", "no");

    user.projects[0].addItem("Clothes", "Need new socks, shoes and coat", "2025/8/1", "low", "no");

    user.projects[0].addItem("Book holiday", "Research on websites", "2025/6/30", "high", "no");
    user.projects[1].addItem("Visit parents", "Drive to hometown", "2025/7/10", "medium", "no");
}

function itemNode(item) {
    const itemNode = document.createElement("ul");
    const titleElement = document.createElement("li");
    const descriptionElement = document.createElement("li");
    const dueDateElement = document.createElement("li");
    const priorityElement = document.createElement("li");
    const completedElement = document.createElement("li");
    const removeItemButton = document.createElement("button");
    const editItemButton = document.createElement("button");

    itemNode.classList.add("item");
    itemNode.classList.add(item.priority);
    titleElement.classList.add("title");
    descriptionElement.classList.add("description");
    dueDateElement.classList.add("dueDate");
    priorityElement.classList.add("priority");
    completedElement.classList.add("completed");

    titleElement.innerText = item.title;
    descriptionElement.innerText = item.description;
    dueDateElement.innerText = "Due: " + format(item.dueDate, "do MMM yyyy");
    priorityElement.innerText = "Priority: " + item.priority;
    completedElement.innerText = "Completed: " + item.completed;
    removeItemButton.innerText = "remove";
    editItemButton.innerText = "edit";

    removeItemButton.addEventListener("click", () => {
        myUser.removeItem(item.projectId, item.id);
        display(myUser);
        saveProjects(myUser);
    });

    editItemButton.addEventListener("click", () => {
        itemSubmitButton.dataset.projectId = item.projectId;
        itemSubmitButton.dataset.itemId = item.id;
        itemSubmitButton.dataset.editNotAdd = "true";
        formTitle.value = item.title;
        formDescription.value = item.description;
        formDueDate.value = format(item.dueDate, "yyyy-MM-dd");
        switch (item.priority) {
            case "high":
                formPriorityHigh.checked = true;
                break;
            case "medium":
                formPriorityMedium.checked = true;
                break;
            case "low":
                formPriorityLow.checked = true;
        }
        switch (item.completed) {
            case "yes":
                formCompleted.checked = true;
                break;
            case "no":
                formUncompleted.checked = true;
        }
        itemDialog.show();
    });

    itemNode.appendChild(titleElement);
    itemNode.appendChild(descriptionElement);
    itemNode.appendChild(dueDateElement);
    itemNode.appendChild(priorityElement);
    itemNode.appendChild(completedElement);
    itemNode.appendChild(removeItemButton);
    itemNode.appendChild(editItemButton);
    return itemNode;
}

function projectNode(project) {
    const projectNode = document.createElement("div");
    const removeProjectButton = document.createElement("button");
    const editProjectButton = document.createElement("button");
    const projectName = document.createElement("h2");
    const addItemButton = document.createElement("button");

    projectNode.classList.add("project");
    projectName.classList.add("name");

    removeProjectButton.innerText = "remove";
    editProjectButton.innerText = "change name";
    projectName.innerText = "Project: " + project.name;
    addItemButton.innerText = "add item";

    removeProjectButton.addEventListener("click", () => {
        myUser.removeProject(project.id);
        display(myUser);
        saveProjects(myUser);
    });

    editProjectButton.addEventListener("click", () => {
        projectSubmitButton.dataset.projectId = project.id;
        projectSubmitButton.dataset.editNotAdd = "true";
        projectDialog.show();
    });

    addItemButton.addEventListener("click", () => {
        itemSubmitButton.dataset.projectId = project.id;
        itemSubmitButton.dataset.editNotAdd = "false";
        formDueDate.value = format(endOfTomorrow(), "yyyy-MM-dd");
        itemDialog.show();
    });

    projectNode.appendChild(removeProjectButton);
    projectNode.appendChild(editProjectButton);
    projectNode.appendChild(projectName);
    for (const item of project.items) {
        projectNode.appendChild(itemNode(item));
    }
    projectNode.appendChild(addItemButton);
    return projectNode;
}

function display(user) {
    container.innerHTML = "";
    for (const project of user.projects) {
        container.appendChild(projectNode(project));
    }
}

addProjectButton.addEventListener("click", () => {
    projectSubmitButton.dataset.editNotAdd = "false";
    projectDialog.show();
});
