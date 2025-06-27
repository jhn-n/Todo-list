import "./style.css";
import { Workspace } from "./classes.js";
import { loadProjects, createExamples } from "./storage.js";
import { setUpButtons, display } from "./dom.js";

const myUser = new Workspace("John");
startUp(myUser);

function startUp(user) {
	if (!loadProjects(user)) {
		createExamples(user);
	}
	setUpButtons(user);
	display(user);
}
