import { getHeader, createText, createImage, createDiv, appendTo } from "./helpers";
import getTabs from "../logic/tabs";
import { getProjectButton } from "./buttons";

import WebsiteLogo from "../../images/logo.png";

export default function loadHeader() {
    const header = getHeader();

    const websiteInfo = createDiv("web-info");
    const icon = createImage("web-logo", WebsiteLogo, "website logo");
    const title = createText("web-title", "Dailist", "h1");
    appendTo(websiteInfo, icon, title);

    const tabs = getTabs();

    const newProjectButton = getProjectButton();

    appendTo(header, websiteInfo, tabs, newProjectButton);
}