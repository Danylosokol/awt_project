import Mustache from "./mustache.js"
import processCommentFrmData from "./opinionsHandler.js"
import articleFormsHandler from "./articleFormsHandler.js"
import commentFormsHandler from "./commentFormHandler.js"


export default[
    {
        hash:"about",
        target:"router-view",
        getTemplate:(targetElm) => {
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
            /*if(!window.userHandler){
                window.userHandler = new dataUserHandler();
            }
            window.userHandler.assignButtons();*/
        }
    },
    {
        hash:"articles",
        target:"router-view",
        getTemplate: fetchAndDisplayArticles
    },
    {
        hash:"addComment",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-form").innerHTML;
            fillForm();
            document.getElementById("myForm").onsubmit = processCommentFrmData;
        }
    },
    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions
    },
    {
        hash:"article",
        target:"router-view",
        getTemplate: fetchAndDisplayArticleDetail
    },
    {
        hash:"artEdit",
        target: "router-view",
        getTemplate: editArticle
    },
    {
        hash: "artDelete",
        target: "router-view",
        getTemplate: deleteArticle
    },
    {
        hash: "artInsert",
        target: "router-view",
        getTemplate: insertArticle
    },
    {
        hash: "artComments",
        target: "router-comments",
        getTemplate: handleComments
    }

];

const urlBase = "https://wt.kpi.fei.tuke.sk/api";


function createHtml4opinions(targetElm){
    const commentsFrmStorage=localStorage.Comments;
    let comments=[];
    if(commentsFrmStorage){
        comments=JSON.parse(commentsFrmStorage);
        comments.forEach(comment => {
            comment.brand = comment.brand === undefined ? "iná" : comment.brand;
            comment.gener = comment.gener === "" ? "iný" : comment.gener;
            comment.newsletter = comment.newsletter ? "Odoberá newsletter" : "Neododberá newsletter";
            comment.botCheck = comment.botCheck ? "\u2713" : "\u2717";
        });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        comments
    );
}

function fetchAndDisplayArticles(targetElm, current, totalPageCount){
    current=parseInt(current);
    let offset = (current*20) - 20;
    const url = `https://wt.kpi.fei.tuke.sk/api/article/?max=20&offset=${offset}&tag=sluchadla`;
    /*&tag=sluchadla*/
    function reqListener () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);
            addArtDetailLink2ResponseJson(response);
            totalPageCount = Math.ceil(response.meta.totalCount/20);
            const data = {
                articles: response.articles,
                currentPage:current,
                totalPageCount: totalPageCount
            }
            if(current>1){
                data.prevPage=current-1;
                data.goFirst = 1;
            }

            if(current < totalPageCount){
                data.nextPage=current+1;
                data.goLast = totalPageCount;
            }
            addContentAndDisplayArt(data, targetElm);

        } else {
            alert("Došlo k chybe: " + this.statusText);
        }
    }

    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function addArtDetailLink2ResponseJson(response){
    response.articles = response.articles.map(
        article => (
            {
                ...article,
                detailLink: `#article/${article.id}/${response.meta.offset}/${response.meta.totalCount}`
            }
        )
    );
}

function addContentAndDisplayArt(data, targetElm){
    let articlesCount = data.articles.length;
    for(let i = 0; i < articlesCount; i++){
        let urlForContent = `${urlBase}/article/${data.articles[i].id}`
        let ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function(){
            if(this.status === 200){
                let responseJSON = JSON.parse(this.responseText);
                data.articles[i].content = responseJSON.content;
                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-articles").innerHTML, data
                    );
            }
            else{
                console.log("Content load error");
            }
        });
        ajax.open("GET", urlForContent, true);
        ajax.send();
    }
}

function fetchAndDisplayArticleDetail(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash){
    let commentPage = 1;
    let pageCount = 1;
    fetchAndProcessArticle(...arguments, commentPage, pageCount, false);
}

function fetchAndProcessArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash, commentPage, pageCount, forEdit){
    const url = `${urlBase}/article/${artIdFromHash}`;

    function reqListener(){
        if(this.status === 200){
            const responseJSON = JSON.parse(this.responseText);
           for(let i = 0; i < responseJSON.tags.length; i++){
                console.log(responseJSON.tags[i]);
                if(responseJSON.tags[i] === 'sluchadla'){
                    responseJSON.tags.splice(i, 1);
                }
            }

            if(forEdit){
                responseJSON.formTitle="Úprava článku";
                responseJSON.submitBtTitle="Save article";
                responseJSON.backLink = `#article/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article-form").innerHTML, responseJSON
                    );
                fillForm();
                if(!window.artFrmHandler){
                    window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
                }
                window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", artIdFromHash, offsetFromHash, totalCountFromHash/*, commentPage, pageCount*/);
            }else{
                responseJSON.backLink = `#articles/${(parseInt(offsetFromHash)+20)/20}/${Math.ceil(totalCountFromHash/20)}`;
                responseJSON.editLink = `#artEdit/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.deleteLink = `#artDelete/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;
                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article").innerHTML, responseJSON
                    );
                responseJSON.tags[responseJSON.tags.length] = 'sluchadla';

                console.log(responseJSON);
                window.location.hash = `#artComments/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}/${commentPage}/${pageCount}`;
            }
        }
        else{
            const errMsgObj = {errMessage:this.responseText};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML, errMsgObj
                );
        }
    }

    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function fillForm() {
    let sgnd
    if(auth2.isSignedIn) {
        sgnd = auth2.isSignedIn.get();
    }
    if(sgnd) {
        const authorInfoElm = document.getElementById("author");
        const nameInfoElm = document.getElementById("name");
        const userNameInfoElm = document.getElementById("user-name");
        if (authorInfoElm) {
            if(auth2.currentUser) {
                authorInfoElm.value = auth2.currentUser.get().getBasicProfile().getName();
            }
        } else if (nameInfoElm) {
            if(auth2.currentUser) {
                nameInfoElm.value = auth2.currentUser.get().getBasicProfile().getName();
            }
        } else if (userNameInfoElm) {
            if(auth2.currentUser) {
                userNameInfoElm.value = auth2.currentUser.get().getBasicProfile().getName();
            }
        }
    }
}

function editArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash){
    let commentPage = 1;
    let pageCount = 1;
    fetchAndProcessArticle(...arguments, commentPage, pageCount, true);
}

function deleteArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash){
    const postReqSettings =
        {
            method: 'DELETE'
        };
    console.log(`${urlBase}/article/${artIdFromHash}`);
    fetch(`${urlBase}/article/${artIdFromHash}`, postReqSettings)
        .then(response => {
            if(response.ok){
                response.text().then(console.log);
                return response;
            } else {
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(()=>{
            window.alert("Article was successfully deleted");
        })
        .catch(error=>{
            window.alert(`Failed to delete. ${error}`)
        })
        .finally( ()=> window.location.hash = `#articles/${(parseInt(offsetFromHash)+20)/20}/${Math.ceil(totalCountFromHash/20)}`);
}

function insertArticle(targetElm){
    let url = "https://wt.kpi.fei.tuke.sk/api/article/";
    function reqListener(){
        if(this.status === 200) {
            const responseJSON = JSON.parse(this.responseText);
            responseJSON.formTitle="Pridanie nového článku";
            responseJSON.submitBtTitle="Save article";
            let totalPageCount = Math.ceil(responseJSON.meta.totalCount/20);
            responseJSON.backLink = `#articles/1/${totalPageCount}`;

            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-article-form").innerHTML, responseJSON
                );
            fillForm();
            if(!window.artFrmHandler){
                window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
            }
            window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", -1, 0, totalPageCount);

        }else {
            alert("Došlo k chybe: " + this.statusText);
        }
    }
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function handleComments(targetElm, artId, offsetFromHash, totalCountFromHash, current, total){
    current = parseInt(current);
    total = parseInt(total);
    let offset = (current*10) - 10;
    let url = `https://wt.kpi.fei.tuke.sk/api/article/${artId}/comment/?max=10&offset=${offset}`;
    function reqListener(){
        if(this.status === 200) {
            const responseJSON = JSON.parse(this.responseText);
            total = Math.ceil(responseJSON.meta.totalCount/10);
            const data = {
                comments: responseJSON.comments,
                id: artId,
                offset: offsetFromHash,
                currentPage:current,
                total: totalCountFromHash,
                totalPage: total
            }
            if(current>1){
                data.prevPage=current-1;
            }

            if(current < total){
                data.nextPage=current+1;
            }
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-article-comments").innerHTML, data
                );
            fillForm();
            if(!window.comFrmHandler) {
                window.comFrmHandler = new commentFormsHandler("https://wt.kpi.fei.tuke.sk/api");
            }
            window.comFrmHandler.assignCommentAndArticle("comment_form", "hiddenElm", artId, offsetFromHash, totalCountFromHash/*, current, total*/);

        }else {
            alert("Došlo k chybe: " + this.statusText);
        }
    }
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}