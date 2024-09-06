import { handleSubmit } from "../logic/form";
import { getDialogSpace, createDiv, createButton, createDialog, appendTo, createText,
    handleClick, showLastDialog, closeDialog, closeDialogs, createForm, createLabel,
    createInput, createRequiredInput, createSubmitButton,
    createBulletList, createListItem,
    createRadioButton
 } from "./helpers";
import { addNewProject, addNewTask, getProjects, getTitleIndexOf } from "../logic/object";
import { format } from "date-fns";
import { get } from "./get";

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
        taskCheckBox.checked = taskObject.finished;
        const newTask = createListItem("task", task);
        const prioritySignal = createDiv(`priority ${taskObject.priority}-priority`);
        const dueDateText = createText("due-date-task", format(taskObject.dueDate, "yyyy/MM/dd"), "p");
        appendTo(newTaskContainer, taskCheckBox, newTask, prioritySignal, dueDateText);
        appendTo(taskList, newTaskContainer);
    });
    const addDiv = createDiv("add-task-container");
    const addTaskButton = createButton("tasks-add-task task-btn", "");
    const addTaskText = createText("tasks-add-task task-text", "Add new task...");
    handleClick(showNewTaskForm, addTaskButton, addTaskText);
    appendTo(addDiv, addTaskButton, addTaskText);
    appendTo(taskList, addDiv);
    appendTo(container, projectTitle, taskList);
    appendTo(dialog, container);
    return dialog;
}

export const showNewTaskForm = function() {
    const newTaskForm = createNewTaskForm();
    appendTo(dialogSpace, newTaskForm);
    showLastDialog();
}

const presetInput = function(containerClass, [...labelProperties], [...inputProperties]) {
    const container = createDiv(containerClass.toString());
    const label = createLabel(labelProperties[0], labelProperties[1], labelProperties[2]);
    const input = createInput(inputProperties[0], inputProperties[1], inputProperties[2]);
    appendTo(container, label, input);
    return container;
}

const presetRadioButton = function(value, name, Id, labelContent) {
    const container = createDiv("radio-container");
    const radioButton = createRadioButton(name, value, "radio", Id, "dialog-radio");
    const label = createLabel(labelContent, Id, "dialog-label");
    appendTo(container, radioButton, label);
    return container;
}

const createNewTaskForm = function() {
    const dialog = genericDialog("new-task-dialog", "new-task-dialog");
    const container = createDiv("new-task-container");
    const dialogTitle = createText("dialog-title", "Add New Task", "h3");
    const form = createForm("new-task-form", "new-task-form");
    const taskName = presetInput("input-container", ["Task:", "task-name", "dialog-label"],
        ["text", "task-name", "add-task task-name"]);
    const dueDate = presetInput("input-container", ["Due Date:", "due-date-task", "dialog-label"],
        ["date", "due-date-task", "add-task task-due-date"]
    );
    const priorityContainer = createDiv("input-container");
    const priorityLabel = createLabel("Priority:", "task-priority-list", "dialog-label");
    const priorityButtonContainer = createDiv("radios-container");
    priorityButtonContainer.setAttribute("id", "task-priority-list");
    const lowPriority = presetRadioButton("low", "task-priority", "", "Low");
    const medPriority = presetRadioButton("medium", "task-priority", "", "Medium");
    const highPriority = presetRadioButton("high", "task-priority", "", "High");
    appendTo(priorityButtonContainer, lowPriority, medPriority, highPriority);
    appendTo(priorityContainer, priorityLabel, priorityButtonContainer);
    const finishedContainer = createDiv("input-container");
    const finishedLabel = createLabel("Finished?", "task-finished-state", "dialog-label");
    const finishedButtonContainer = createDiv("radios-container");
    finishedButtonContainer.setAttribute("id", "task-finished-state");
    const yesRadio = presetRadioButton("true", "task-finished-state", "", "Yes");
    const noRadio = presetRadioButton("false", "task-finished-state", "", "No");
    appendTo(finishedButtonContainer, yesRadio, noRadio);
    appendTo(finishedContainer, finishedLabel, finishedButtonContainer);
    const submitButton = createSubmitButton("Add", "add-task task-submit");
    appendTo(form, taskName, dueDate, priorityContainer, finishedContainer, submitButton);
    handleSubmit(() => addNewTask(get("#dialogs dialog:first-child h3.tasks-header").textContent), form);
    appendTo(container, dialogTitle, form);
    appendTo(dialog, container);
    return dialog;
}

export const handleTaskDialogs = function(projectTitle) {
    closeDialogs();
    showTasksDialog(projectTitle);
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