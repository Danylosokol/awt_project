export default function processCommentFrmData(event){
    event.preventDefault();

    const newName = document.getElementById("name").value.trim();
    const newEmail = document.getElementById("email").value.trim();
    let newImage = document.getElementById("image").value.trim();
    const newText = document.getElementById("comment").value.trim();
    const newGener = document.getElementById("music_geners").value.trim();
    const newNewsletter = document.getElementById("newsletter").checked;
    const newBotCheck = document.getElementById("bot_check").checked;
    const newBrands = document.querySelectorAll('input[name="brand"]')

    let newBrand;
    for (let i of newBrands) {
        if (i.checked) {
            newBrand = i.value;
            break
        }
    }

    if (newName === "" || newEmail === "" || newText === "") {
        window.alert("Please, enter your name, email and comment");
        return;
    }

    if (newImage === "") {
        newImage = "././fig/profile_picture.webp";
    }

    const newComment = {
        name: newName,
        email: newEmail,
        image: newImage,
        text: newText,
        brand: newBrand,
        gener: newGener,
        newsletter: newNewsletter,
        botCheck: newBotCheck,
    }
    let comments = [];
    if(localStorage.Comments){
        comments = JSON.parse(localStorage.Comments);
    }
    comments.push(newComment);
    localStorage.Comments = JSON.stringify(comments);
    window.location.hash = "opinions";

}
