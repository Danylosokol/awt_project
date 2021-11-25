window.onload = function () {
    document.querySelector("svg").style.visibility = "visible";
}

import mainMenuHandler from "./mainMenu.js"
window.mainMenu = new mainMenuHandler("hamburgerIcon", "menu_links");

import Router from "./paramHashRouter.js";
import Routes from "./routes.js";

window.router = new Router(Routes,"#about");


