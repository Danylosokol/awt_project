window.onload = function () {
    document.querySelector("svg").style.visibility = "visible";
}

let nextSectionButton = document.querySelector(".nextSection");
let articles = document.getElementById("nameOfSection");
let comments = document.getElementById("comments");
let content;

if (nextSectionButton !== null) {
    document.addEventListener('scroll', function () {
        if (window.scrollY >= articles.getBoundingClientRect().top &&
            window.scrollY < comments.getBoundingClientRect().top &&
            nextSectionButton.textContent === "\u22C1") {
            nextSectionButton.href="#comments"
        } else if (window.scrollY >= articles.getBoundingClientRect().top &&
            window.scrollY < comments.getBoundingClientRect().top &&
            nextSectionButton.textContent === "\u22C0") {
            nextSectionButton.href="#top"
        }else if(window.scrollY >= comments.getBoundingClientRect().top){
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