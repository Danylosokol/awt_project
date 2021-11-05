let comments = [];

if(localStorage.Comments){
    comments = JSON.parse(localStorage.Comments);
    console.log(comments);
}

const commentForm = document.getElementById("myForm");

commentForm.addEventListener("submit", function(event){
    event.preventDefault();
    const newName = document.getElementById("name").value.trim();
    const newEmail = document.getElementById("email").value.trim();
    const newImage = document.getElementById("image").value.trim();
    const newComment = document.getElementById("comment").value.trim();
    const newGener = document.getElementById("music_geners").value.trim();
    const newNewsletter = document.getElementById("newsletter").checked;
    const newBotCheck = document.getElementById("bot_check").checked;
    const newBrands = document.querySelectorAll('input[name="brand"]');
    let newBrand;
    for(let i of newBrands){
        if(i.checked){
            newBrand = i.value;
            break
        }
    }
    /*
    console.log(newBrand);
    console.log(newName);
    console.log(newEmail);
    console.log(newComment);
    console.log(newImage);
    console.log(newNewsletter);
    console.log(newGener);
    console.log(newBotCheck);*/
    if(newBotCheck === false || newName === "" || newEmail === "" || newComment === ""){
        window.alert("Please, enter your name, email and comment and check bot checkbox");
        return;
    }

    const Comment = {
        name: newName,
        email: newEmail,
        image: newImage,
        comment: newComment,
        brand: newBrand,
        gener: newGener,
        newsletter: newNewsletter,
        botCheck: newBotCheck,
    }
    comments.push(Comment);
    localStorage.Comments = JSON.stringify(comments);
    commentForm.reset();
});



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