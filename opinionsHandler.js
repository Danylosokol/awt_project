export default class OpinionsHandler{
    constructor(commentForm, commentContainer){
        this.comments = [];
        this.commentsElement = document.getElementById(commentContainer);
        this.commentsForm = document.getElementById(commentForm);
    }

    init(){
        if(localStorage.Comments){
            this.comments = JSON.parse(localStorage.Comments);
        }

        this.commentsElement.innerHTML = this.commentsArrayToHtml(this.comments);

        this.commentsForm.addEventListener("submit", event=>this.processCommentFrmData(event));
    }

    processCommentFrmData(event){
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
        for(let i of newBrands){
            if(i.checked){
                newBrand = i.value;
                break
            }
        }

        if(newName === "" || newEmail === "" || newText === ""){
            window.alert("Please, enter your name, email and comment");
            return;
        }

        if(newImage === ""){
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
        this.comments.push(newComment);
        localStorage.Comments = JSON.stringify(this.comments);

        this.commentsElement.innerHTML += this.commentToHtml(newComment);

        this.commentsForm.reset();
    }

    commentToHtml(comment){
        return `<div class="comment">
                <img src="${comment.image}" class="profile_photo" alt="user profile picture">
                <div class="comment_info">
                    <h3>${comment.name} ${comment.botCheck ? "&#10003;" : "&#10007;"}</h3> 
                    <p class="comment_email">${comment.email}</p>
                    <p class="comment_text">${comment.text}</p>
                    <p class="add_info">Preferovaná značka slúchadiel: ${comment.brand}</p>
                    <p class="add_info">Preferovaný žáner hudby: ${comment.gener}</p>
                    <p class="add_info">${comment.newsletter ? "Odoberá newsletter" : "Neododberá newsletter"}</p>
                </div>
                </div>`;
    }

    commentsArrayToHtml(array){
        return array.reduce((htmlWithComments, comment) => htmlWithComments + this.commentToHtml(comment), "");
    }
}