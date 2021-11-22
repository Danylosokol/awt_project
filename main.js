/*
import OpinionsHandler from "./opinionsHandler.js";

window.opnsHndlr = new OpinionsHandler("myForm", "commentList");
window.opnsHndlr.init();
*/
window.onload = function () {
    document.querySelector("svg").style.visibility = "visible";
}
/*
import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";
window.opnsHndlr = new OpinionsHandlerMustache("myForm", "commentList", "mustacheTemplate");
window.opnsHndlr.init();
if(window.opnsHndlr.commentsElement.innerHTML === ""){
    if(document.getElementById("first_comment") !== null){
        document.getElementById("first_comment").style.visibility = "visible";
    }
      window.opnsHndlr.commentsElement.innerHTML = '<p class="first_comment" id="first_comment">Žiadne komentáre. Buďte prvý, kto zanechá komentár.</p>';
}

import NextSectionHandler from "./nextSectionHandler.js"
window.nextSection = new NextSectionHandler(".nextSection", "nameOfSection", "comments_form");
*/
import mainMenuHandler from "./mainMenu.js"
window.mainMenu = new mainMenuHandler("hamburgerIcon", "menu_links");

import Router from "./paramHashRouter.js";
import Routes from "./routes.js";

window.router = new Router(Routes,"#opinions");


