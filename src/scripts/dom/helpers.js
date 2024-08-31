class Query {
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

export const getHeader = new Query("header").get;