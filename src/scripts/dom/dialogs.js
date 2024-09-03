import { handleSubmit } from "../logic/form";
import { getDialogSpace, createDiv, createButton, createDialog, appendTo, createText,
    handleClick, showLastDialog, closeDialog, closeDialogs, createForm, createLabel,
    createInput, createRequiredInput, createSubmitButton
 } from "./helpers";
import { addNewProject } from "../logic/object"; 

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

const boolChoiceDialog = function(question, nextStep) {
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
