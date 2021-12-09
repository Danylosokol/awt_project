export default class commentFormHandler{
    constructor(articlesServerUrl){
        this.serverUrl = articlesServerUrl;
    }

    assignCommentAndArticle(formElementId, cssClass2hideElement, articleId, offset, totalCount, /*commentPage, pageCount*/) {
        this.cssCl2hideElm = cssClass2hideElement;
        const commentForm = document.getElementById(formElementId);
        this.formElements = commentForm.elements;

       this.formElements.namedItem('addComment').onclick = ()=> this.showCommentForm();
        this.formElements.namedItem('cancelComment').onclick = ()=> this.hideCommentForm();
        /*this.formElements.namedItem('submitComment').onclick = (event) => this.processCommentFrmData(event);*/
        document.getElementById("submitComment").addEventListener('click', event => this.processCommentFrmData(event));
        this.articleId = articleId;
        this.offset = offset;
        this.totalCount = totalCount;
        /*this.commentPage = commentPage;
        this.pageCount = pageCount;*/

    }

    showCommentForm(){
        this.formElements.namedItem('commentEdit').classList.remove(this.cssCl2hideElm);
        this.formElements.namedItem('addComment').classList.add( this.cssCl2hideElm);
    }

    hideCommentForm() {
        this.formElements.namedItem('commentEdit').classList.add( this.cssCl2hideElm);
        this.formElements.namedItem('addComment').classList.remove( this.cssCl2hideElm);
    }

    processCommentFrmData(event){
        event.preventDefault();
        const comment = {
            author: this.formElements.namedItem("user-name").value.trim(),
            text: this.formElements.namedItem("comment-text").value.trim()
        }
        if(!comment.author || !comment.text){
            window.alert("Please, enter comment and your name");
            return
        }
        const postReqSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(comment)
        }
        fetch(`${this.serverUrl}/article/${this.articleId}/comment`, postReqSettings)
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
                }
            })
            /*.then(()=>{
                window.alert("Comment was successfully posted");
            })*/
            .catch(error=>{
                window.alert(`Failed to post comment. ${error}`)
            })
            .finally(() => window.location.hash = `#article/${this.articleId}/${this.offset}/${this.totalCount}`);
    }
}