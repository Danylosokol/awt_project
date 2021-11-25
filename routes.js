import Mustache from "./mustache.js"
import processCommentFrmData from "./opinionsHandler.js"

export default[
    {
        hash:"about",
        target:"router-view",
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
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
            document.getElementById("myForm").onsubmit = processCommentFrmData;
        }
    },
    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions
    }
];

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

function fetchAndDisplayArticles(targetElm, current){
    current=parseInt(current);
    let offset = (current*20) - 20;
    const url = "https://wt.kpi.fei.tuke.sk/api/article/?max=20&offset=" + offset;

    function reqListener () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);
            const data = {
                currentPage:current,
                articles: response.articles
            }

            if(response.articles.length === 20){
                data.nextPage=current+1;
            }

            if(current>1){
                data.prevPage=current-1;
            }

            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles").innerHTML, data
                );
        } else {
            alert("Došlo k chybe: " + this.statusText);
        }
    }

    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}