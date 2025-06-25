import "./style.css";
import { greeting } from "./dom.js";
console.log(greeting);

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

	// make private?
	findItemIndex(itemId) {
		const itemIndex = this.items.findIndex((e) => e.id === itemId);
		if (itemIndex < 0) {
			alert("could not find index");
			return undefined;
		}
		return itemIndex;
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

class workspace {
    constructor(workplaceName) {
        this.name = workplaceName;
        this.projects = [];
        this.addProject("Default");
    }

    findProjectIndex(projectId) {
        const projectIndex = this.projects.findIndex((e) => e.id === projectId);
        if (itemIndex < 0) {
            alert("could not find index");
            return undefined;
        }
        return projectIndex;
    }
    
    addProject(projectName) {
        const newProject = new Project(projectName);
        this.projects.push(newProject);
    }
    
    removeProject(projectID) {
        const projectIndex = this.findProjectIndex(projectID);
        if (projectIndex < 0) {
            alert("could not find index");
        }
        this.projects.splice(projectIndex, 1);
    }
}
    
const myUser = new workspace("John");
myUser.addProject("Alternative");


myUser.projects[0].addItem(
	"Hair cut",
	"Go to hairdressers",
	"next week",
	"moderate",
	false
);

myUser.projects[0].addItem(
	"Clothes",
	"Need new socks, shoes and coat",
	"next month",
	"low",
	false
);

myUser.projects[0].addItem(
	"Book holiday",
	"Research on websites",
	"tomorrow",
	"high",
	false
);
myUser.projects[1].addItem(
	"Visit parents",
	"Drive to hometown",
	"next month",
	"moderate",
	false
);

for (const project of myUser.projects) {
	console.table(project);
	for (const item of project.items) {
		console.table(item);
	}
}

const id1 = myUser.projects[0].items[0].id;
const id2 = myUser.projects[0].items[1].id;


