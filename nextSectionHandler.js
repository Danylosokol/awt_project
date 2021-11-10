export default class NextSectionHandler{
    constructor(buttonSelector, articlesId, commentsId){
        this.nextSectionButton = document.querySelector(buttonSelector);
        this.articles = document.getElementById(articlesId);
        this.comments = document.getElementById(commentsId);

        if(document.URL.includes("index.html")){
            document.addEventListener('scroll', event => this.changeButtonContent(event))
        }
    }

    changeButtonContent(){
        let content;
        if (window.scrollY >= this.articles.getBoundingClientRect().top &&
            window.scrollY < this.comments.getBoundingClientRect().top &&
            this.nextSectionButton.textContent === "\u22C1") {
            this.nextSectionButton.href="#comments_form"
        } else if (window.scrollY >= this.articles.getBoundingClientRect().top &&
            window.scrollY < this.comments.getBoundingClientRect().top &&
            this.nextSectionButton.textContent === "\u22C0") {
            this.nextSectionButton.href="#top"
        }else if(window.scrollY >= this.comments.getBoundingClientRect().top){
            content = "\u22C0";
            this.nextSectionButton.textContent = content;
            this.nextSectionButton.href = "#nameOfSection";
        } else{
            content = "\u22C1";
            this.nextSectionButton.textContent = content;
            this.nextSectionButton.href = "#nameOfSection";
        }
    }
}
