const storageKey = "ToDoProjects";

function convertProjectsToJSON(user) {
    const dataJSON = JSON.stringify(user.projects);
    return dataJSON;
}

function retrieveProjectsFromJSON(user, dataJSON) {
    const dataRetrieved = JSON.parse(dataJSON);
    for (const project of dataRetrieved) {
        user.addProject(project.name);
        const projectID = user.projects.at(-1).id;
        for (const item of project.items) {
            user.addItem(
                item.title,
                item.description,
                item.dueDate,
                item.priority,
                item.completed,
                projectID,
            );
        }
    }
}

export function clearProjects(user) {
    user.projects = [];
}

export function deleteSavedProjects() {
    localStorage.removeItem(storageKey);
}

export function saveProjects(user) {
    localStorage.setItem(storageKey, convertProjectsToJSON(user));
}

export function loadProjects(user) {
    const loadedJSON = localStorage.getItem(storageKey);
    if (loadedJSON) {
        retrieveProjectsFromJSON(user, loadedJSON);
        return true;
    }
    return false;
}

export function createExamples(user) {
    clearProjects(user);
    user.addProject("Default");
    user.addProject("Alternative");

    user.projects[0].addItem("Hair cut", "Go to hairdressers", "2025/7/13", "medium", "no");
    user.projects[0].addItem("Clothes", "Need new socks, shoes and coat", "2025/8/1", "low", "no");
    user.projects[0].addItem("Book holiday", "Research on websites", "2025/6/30", "high", "no");
    user.projects[1].addItem("Visit parents", "Drive to hometown", "2025/7/10", "medium", "no");
}
