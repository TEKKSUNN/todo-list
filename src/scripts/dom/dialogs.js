import { handleSubmit } from "../logic/form";
import { getDialogSpace, createDiv, createButton, createDialog, appendTo, createText,
    handleClick, showLastDialog, closeDialog, closeDialogs, createForm, createLabel,
    createInput, createRequiredInput, createSubmitButton,
    createBulletList, createListItem
 } from "./helpers";
import { addNewProject, getProjects, getTitleIndexOf } from "../logic/object";
import { format } from "date-fns";

/* TODO:
    - Make a dialog that prompts the user for adding new project
    - Make a dialog that prompts the user for adding new task
    - Make a project-card that shows the project on the project list w/ appropriate buttons
    - Add ability to make notes of the project
    - Add ability to view the tasks inside the project
    - Add ability to add a task directly in the project-card
    - Add ability to delete a project, use prompt yes/no
    - Before adding the task, prompt user if they really want to add it
    - Before adding project, prompt user if they really want to add it
    - Add cancel button to all dialogs, one logic removing all
*/

const dialogSpace = getDialogSpace();

const genericDialog = function(className, Id) {
    const dialog = createDialog(className, Id);
    const cancelButton = createButton("cancel-btn", "X");
    handleClick(closeDialogs, cancelButton);
    appendTo(dialog, cancelButton);
    return dialog;
}

export const boolChoiceDialog = function(question, nextStep) {
    const dialog = genericDialog("bool-dialog");
    const text = createText("question", `${question}`, "p");
    const choices = createDiv("choices");
    const yesButton = createButton("dialog-btn yes-btn", "Yes");
    const noButton = createButton("dialog-btn no-btn", "No");
    handleClick(closeDialog, yesButton, noButton);
    handleClick(nextStep, yesButton)
    appendTo(choices, yesButton, noButton);
    appendTo(dialog, text, choices);
    appendTo(dialogSpace, dialog);
    showLastDialog();
}

export const showProjectDialog = function() {
    const projectDialog = createProjectDialog();
    appendTo(dialogSpace, projectDialog);
    showLastDialog();
}

const createProjectDialog = function() {
    const dialog = genericDialog("add-new", "add-project");
    const form = createForm("add-form", "new-project");
    const text = createText("form-title", "Add New Project", "h2");
    const titleGroup = createDiv("group title-group");
    const titleLabel = createLabel("Title:", "title-input", "project-label");
    const titleInput = createRequiredInput("text", "title-input", "project-input required");
    appendTo(titleGroup, titleLabel, titleInput);
    const descGroup = createDiv("group desc-group");
    const descLabel = createLabel("Description:", "desc-input", "project-label");
    const descInput = createInput("text", "desc-input", "project-input");
    appendTo(descGroup, descLabel, descInput);
    const dueDateGroup = createDiv("group due-date-group");
    const dueDateLabel = createLabel("Due Date:", "due-date-input", "project-label");
    const dueDate = createInput("datetime-local", "due-date-input", "project-input");
    appendTo(dueDateGroup, dueDateLabel, dueDate);
    const submitButton = createSubmitButton("Add", "add-button project-submit");
    handleSubmit(addNewProject, form);
    appendTo(form, text, titleGroup, descGroup, dueDateGroup, submitButton);
    appendTo(dialog, form);
    return dialog;
}

export const showTasksDialog = function(projectTitle) {
    const tasksDialog = createTasksDialog(getTitleIndexOf(projectTitle));
    appendTo(dialogSpace, tasksDialog);
    showLastDialog();
}

const hyphenLower = function(text) {
    return text.replace(/\s+/g, "-").toLowerCase();
}

const createTasksDialog = function(projectIndex) {
    const project = getProjects()[projectIndex];
    const dialog = genericDialog("tasks-dialog", `tasks-${projectIndex}`);
    const container = createDiv("tasks-container");
    const projectTitle = createText("tasks-header", `${project.title}`, "h3");
    const taskList = createBulletList("task-list");
    project.tasks.map((taskObject) => {
        const task = taskObject.task;
        const newTaskContainer = createDiv("task-container");
        const taskCheckBox = createInput("checkbox", `check-${hyphenLower(task)}`, "task-checkbox");
        const newTask = createListItem("task", task);
        const prioritySignal = createDiv(`priority ${taskObject.priority}-priority`);
        const dueDateText = createText("due-date-task", format(taskObject.dueDate, "yyyy/MM/dd"), "p");
        appendTo(newTaskContainer, taskCheckBox, newTask, prioritySignal, dueDateText);
        appendTo(taskList, newTaskContainer);
    });
    const addDiv = createDiv("add-task-container");
    const addTaskButton = createButton("tasks-add-task task-btn", "");
    const addTaskText = createText("tasks-add-task task-text", "Add new task...");
    appendTo(addDiv, addTaskButton, addTaskText);
    appendTo(taskList, addDiv);
    appendTo(container, projectTitle, taskList);
    appendTo(dialog, container);
    return dialog;
}

// TODO :
//  - Make a dialog that shows all tasks from a project
//  - Make a "New Task" button as its last element on the list
//  - Make a dialog that will give a form that is for the data of the new task
//  - Get that data and add it to the project
//  - Update the tasks dialog based on new task list
//  - Make the "+" icon on a project card be able to add a "New Task"
//  - Make the notes button be able to show a dialog that will show a textarea field and a save button on its bottom
//  - Make sure all dialogs come from the "genericDialog" function, so cancel button will be involved before anything else