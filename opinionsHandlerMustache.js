import OpinionsHandler from "./opinionsHandler.js"
import Mustache from "./mustache.js"

export default class OpinionsHandlerMustache extends OpinionsHandler{
    constructor(commentForm, commentContainer, mustacheTemplate){
        super(commentForm, commentContainer);

        this.mustacheTemplate = document.getElementById(mustacheTemplate).innerHTML;
    }

    commentToHtml(comment){

        const Comment = {
            name: comment.name,
            email: comment.email,
            image: comment.image,
            text: comment.text,
            brand: comment.brand === undefined ? "iná" : comment.brand,
            gener: comment.gener === "" ? "iný" : comment.gener,
            newsletter: comment.newsletter ? "Odoberá newsletter" : "Neododberá newsletter",
            botCheck: comment.botCheck ? "\u2713" : "\u2717"
        }

        return Mustache.render(this.mustacheTemplate, Comment);
    }
}