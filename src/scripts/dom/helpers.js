export class Query {
    constructor(query) {
        this.query = query;
    }

    get = () => {
        return document.querySelector(this.query);
    }

    getAll = () => {
        return Array.from(document.querySelectorAll(this.query));
    }
}

export const createImage = function(className, imageURL, altText) {
    const img = document.createElement("img");
    img.src = imageURL;
    img.alt = altText;
    img.className = className;
    return img;
}

export const createText = function(className, content, elementType) {
    const text = document.createElement(`${elementType}`);
    text.textContent = content;
    text.className = className;
    return text;
}

export const createDiv = function(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

export const createButton = function(className, content) {
    const button = document.createElement("button");
    button.textContent = content;
    button.className = className;
    return button;
}

export const appendTo = function(parentElement, ...childElements) {
    childElements.forEach((childElement) => {
        parentElement.appendChild(childElement);
    });
}

export const createDialog = function(className, Id) {
    const dialog = document.createElement("dialog");
    dialog.className = className;
    dialog.id = Id;
    return dialog;
}

export const handleClick = function(fn, ...elements) {
    elements.forEach((element) => { element.addEventListener("click", fn) });
}

export const getAllTabs = new Query(".tab").getAll;

export const getHeader = new Query("header").get;

export const getContent = new Query("#content").get;

const getDialogs = new Query("dialog").getAll;
const getDialog = () => {
    const dialogs = getDialogs();
    return dialogs[dialogs.length - 1];
};

export const showLastDialog = () => {
    getDialog().showModal();
};

export const closeDialogs = () => {
    const dialogs = getDialogs();
    dialogs.forEach((dialog) => {
        dialog.close()
        dialog.remove()
    });
};
export const closeDialog = () => {
    const dialog = getDialog();
    dialog.close()
    dialog.remove();
};

export const createForm = function(className, Id, method) {
    const form = document.createElement("form");
    form.setAttribute("class", `${className}`);
    form.setAttribute("id", `${Id}`);
    return form;
}

export const createLabel = function(content, forId, className) {
    const label = document.createElement("label");
    label.setAttribute("class", `${className}`);
    label.textContent = content;
    label.setAttribute("for", `${forId}`);
    return label;
}

export const createInput = function(type, Id, className) {
    const input = document.createElement("input");
    input.setAttribute("type", `${type}`);
    input.setAttribute("id", `${Id}`);
    input.setAttribute("class", `${className}`);
    return input;
}

export const createRequiredInput = function(type, Id, className) {
    const input = createInput(type, Id, className);
    input.setAttribute("required", "");
    return input;
}

export const createSelection = function(className, Id, ...selectionValues) {
    const selection = document.createElement("select");
    selection.setAttribute("class", `${className}`);
    selection.setAttribute("id", `${Id}`);
    selectionValues.forEach((value) => {
        const option = document.createElement("option");
        option.setAttribute("value", `${value.trim().replace(/\s+/g, "-").toLowerCase()}`);
        option.textContent = value.trim();
        appendTo(selection, option);
    });
    return selection;
}

export const createSubmitButton = function(content, className) {
    const submitButton = createButton(className, content);
    submitButton.setAttribute("type", "submit");
    return submitButton;
}

export const addRequired = function(element) {
    element.setAttribute("required", "");
}

export const getDialogSpace = new Query("#dialogs").get;