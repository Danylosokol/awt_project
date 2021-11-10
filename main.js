/*
import OpinionsHandler from "./opinionsHandler.js";

window.opnsHndlr = new OpinionsHandler("myForm", "commentList");
window.opnsHndlr.init();
*/
import OpinionsHandlerMustache from "./opinionsHandlerMustache.js"

window.opnsHndlr = new OpinionsHandlerMustache("myForm", "commentList", "mustacheTemplate");
window.opnsHndlr.init();

window.onload = function () {
    document.querySelector("svg").style.visibility = "visible";
}

let nextSectionButton = document.querySelector(".nextSection");
let articles = document.getElementById("nameOfSection");
let comment = document.getElementById("comments_form");
let content;

if (nextSectionButton !== null) {
    document.addEventListener('scroll', function () {
        if (window.scrollY >= articles.getBoundingClientRect().top &&
            window.scrollY < comment.getBoundingClientRect().top &&
            nextSectionButton.textContent === "\u22C1") {
            nextSectionButton.href="#comments_form"
        } else if (window.scrollY >= articles.getBoundingClientRect().top &&
            window.scrollY < comment.getBoundingClientRect().top &&
            nextSectionButton.textContent === "\u22C0") {
            nextSectionButton.href="#top"
        }else if(window.scrollY >= comment.getBoundingClientRect().top){
            content = "\u22C0";
            nextSectionButton.textContent = content;
            nextSectionButton.href = "#nameOfSection";
        } else{
            content = "\u22C1";
            nextSectionButton.textContent = content;
            nextSectionButton.href = "#nameOfSection";
        }
    });
}
