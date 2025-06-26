import "./style.css";
import { Item, Project, Workspace } from "./classes.js";
import { format } from "date-fns";

let currentItem, currentProject, usingDialogToEdit, projectUsingDialogtoEdit;
const container = document.querySelector(".container");
const itemDialog = document.querySelector("#itemDialog");
const itemForm = document.querySelector("#itemForm");
const formTitle = document.querySelector("#formTitle");
const formDescription = document.querySelector("#formDescription");
const formDueDate = document.querySelector("#formDueDate");
const formPriority = document.querySelector("#formPriority");
const formCompleted = document.querySelector("#formCompleted");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const projectDialog = document.querySelector("#projectDialog");
const projectForm = document.querySelector("#projectForm");
const projectName = document.querySelector("#projectName");
const addProjectButton = document.querySelector("#addProjectButton");
const projectSubmitButton = document.querySelector("#projectSubmitButton");
const projectCancelButton = document.querySelector("#projectCancelButton");

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
	titleElement.classList.add("title");
	descriptionElement.classList.add("description");
	dueDateElement.classList.add("dueDate");
	priorityElement.classList.add("priority");
	completedElement.classList.add("completed");

	titleElement.innerText = item.title;
	descriptionElement.innerText = item.description;
	dueDateElement.innerText =
		"Due by: " + format(item.dueDate, "EEE do MMM yyyy");
	priorityElement.innerText = "Priority: " + item.priority;
	completedElement.innerText = "Completed: " + item.completed;
	removeItemButton.innerText = "remove";
	editItemButton.innerText = "edit";

	removeItemButton.addEventListener("click", () => {
		myUser.removeItem(item.projectId, item.id);
		display();
	});

	editItemButton.addEventListener("click", () => {
		currentProject = item.projectId;
		currentItem = item.id;
		usingDialogToEdit = true;
		formTitle.value = item.title;
		formDescription.value = item.description;
		formDueDate.value = item.dueDate;
		formPriority.value = item.priority;
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
	editProjectButton.innerText = "edit";
	projectName.innerText = project.name;
	addItemButton.innerText = "add item";

	removeProjectButton.addEventListener("click", () => {
		myUser.removeProject(project.id);
		display();
	});

	editProjectButton.addEventListener("click", () => {
		currentProject = project.id;
		projectUsingDialogtoEdit = true;
		projectDialog.show();
	});

	addItemButton.addEventListener("click", () => {
		currentProject = project.id;
		usingDialogToEdit = false;
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

function display() {
	container.innerHTML = "";
	for (const project of myUser.projects) {
		container.appendChild(projectNode(project));
	}
}

const myUser = new Workspace("John");

addProjectButton.addEventListener("click", () => {
	projectUsingDialogtoEdit = false;
	projectDialog.show();
});

projectSubmitButton.addEventListener("click", (event) => {
	if (projectUsingDialogtoEdit) {
		myUser.editProject(formName.value, currentProject);
	} else {
		myUser.addProject(formName.value);
	}
	event.preventDefault();
	projectForm.reset();
	projectDialog.close();
	display();
});

projectCancelButton.addEventListener("click", () => {
	projectForm.reset();
	projectDialog.close();
});

submitButton.addEventListener("click", (event) => {
	if (usingDialogToEdit) {
		myUser.editItem(
			formTitle.value,
			formDescription.value,
			formDueDate.value,
			formPriority.value,
			formCompleted.checked,
			currentProject,
			currentItem
		);
	} else {
		myUser.addItem(
			formTitle.value,
			formDescription.value,
			formDueDate.value,
			formPriority.value,
			formCompleted.checked,
			currentProject
		);
	}
	event.preventDefault();
	itemForm.reset();
	itemDialog.close();
	display();
});

cancelButton.addEventListener("click", () => {
	itemForm.reset;
	itemDialog.close();
});

myUser.addProject("Alternative");

myUser.projects[0].addItem(
	"Hair cut",
	"Go to hairdressers",
	"2025/7/13",
	"moderate",
	false
);

myUser.projects[0].addItem(
	"Clothes",
	"Need new socks, shoes and coat",
	"2025/8/1",
	"low",
	false
);

myUser.projects[0].addItem(
	"Book holiday",
	"Research on websites",
	"2025/6/30",
	"high",
	false
);
myUser.projects[1].addItem(
	"Visit parents",
	"Drive to hometown",
	"2025/7/10",
	"moderate",
	false
);

display(myUser);
for (const project of myUser.projects) {
	console.table(project);
	for (const item of project.items) {
		console.table(item);
	}
}
