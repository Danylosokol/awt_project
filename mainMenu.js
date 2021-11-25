export default class mainMenuHandler{
    constructor(buttonSelector, menuSelector){
        this.button = document.getElementById(buttonSelector);
        this.menu = document.getElementById(menuSelector);
        if(document.URL.includes("index.html")) {
            this.button.addEventListener('click', event => this.handleMenu(event));
        }
        this.menu.addEventListener("click", event=>this.close(event));
    }

    handleMenu(){
        if(this.menu.style.display === "block"){
            this.menu.style.display = "none";
        }
        else{
            this.menu.style.display = "block";
            let links = document.querySelectorAll("#menu_links a");
            for(let i = 0; i < links.length; i++){
                console.log(links[i]);
                if(links[i].href === document.URL){
                    links[i].style.display = "none";
                }
                else{
                    links[i].style.display = "block";
                }
            }
        }
    }

    close(event){
        if (event.target === this.menu) {
            this.menu.style.display = "none";
        }
    }
}