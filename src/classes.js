class Item {
	constructor(title, description, dueDate, priority, completed, projectId) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = completed;
		this.projectId = projectId;
		this.id = crypto.randomUUID();
	}

	edit(title, description, dueDate, priority, completed) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = completed;
	}
}

class Project {
	constructor(projectName) {
		this.name = projectName;
		this.items = [];
		this.id = crypto.randomUUID();
	}

	findItemIndex(itemId) {
		const itemIndex = this.items.findIndex((e) => e.id === itemId);
		if (itemIndex < 0) {
			alert("could not find Item index for", itemId);
			return undefined;
		}
		return itemIndex;
	}

	edit(name) {
		this.name = name;
	}

	addItem(title, description, dueDate, priority, completed) {
		const newItem = new Item(
			title,
			description,
			dueDate,
			priority,
			completed,
			this.id
		);
		this.items.push(newItem);
	}

	editItem(title, description, dueDate, priority, completed, itemId) {
		const itemIndex = this.findItemIndex(itemId);
		this.items[itemIndex].edit(
			title,
			description,
			dueDate,
			priority,
			completed
		);
	}

	removeItem(itemId) {
		const itemIndex = this.findItemIndex(itemId);
		this.items.splice(itemIndex, 1);
	}
}

export class Workspace {
	constructor(workplaceName) {
		this.name = workplaceName;
		this.projects = [];
	}

	findProjectIndex(projectId) {
		const projectIndex = this.projects.findIndex((e) => e.id === projectId);
		if (projectIndex < 0) {
			alert("could not find project index for", projectId);
			return undefined;
		}
		return projectIndex;
	}

	addProject(projectName) {
		const newProject = new Project(projectName);
		this.projects.push(newProject);
	}

	editProject(projectName, projectID) {
		const projectIndex = this.findProjectIndex(projectID);
		this.projects[projectIndex].edit(projectName);
	}

	removeProject(projectID) {
		const projectIndex = this.findProjectIndex(projectID);
		this.projects.splice(projectIndex, 1);
	}

	removeItem(projectID, itemID) {
		const projectIndex = this.findProjectIndex(projectID);
		this.projects[projectIndex].removeItem(itemID);
	}

	addItem(title, description, dueDate, priority, completed, projectID) {
		const projectIndex = this.findProjectIndex(projectID);
		this.projects[projectIndex].addItem(
			title,
			description,
			dueDate,
			priority,
			completed
		);
	}

	editItem(title, description, dueDate, priority, completed, projectID, itemID) {
		const projectIndex = this.findProjectIndex(projectID);
		this.projects[projectIndex].editItem(
			title,
			description,
			dueDate,
			priority,
			completed,
			itemID
		);
	}
}
