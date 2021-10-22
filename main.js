window.onload = function () {
    document.querySelector("svg").style.visibility = "visible";
}

let nextSectionButton = document.querySelector(".nextSection");
let articles = document.getElementById("nameOfSection");
let content;

if (nextSectionButton !== null) {
    document.addEventListener('scroll', function () {
        if (window.scrollY >= articles.getBoundingClientRect().top) {
            content = "\u22C0";
            nextSectionButton.textContent = content;
            nextSectionButton.href = "#top";
        } else {
            content = "\u22C1";
            nextSectionButton.textContent = content;
            nextSectionButton.href = "#nameOfSection";
        }
    });
}