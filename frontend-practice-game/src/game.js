class Game {

    constructor(id, points, stars, complete, userId){
        this.id = id,
        this.points = points,
        this.stars = stars,
        this.complete = complete,
        this.userId = userId
    }

    static displayGame(){
        let game = JSON.parse(window.localStorage.currentGame);
        //debugger
        if(!!game){
            let points = game.points;
            let stars = game.stars;
            let complete = game.complete;
            let gameDiv = document.querySelector(".current-game")
            let h3 = document.createElement("h3");
            h3.classList.add("current-points");
            h3.innerText = `Points: ${points}`;
            gameDiv.appendChild(h3);
            let table = document.createElement("table")
            gameDiv.appendChild(table)
            //debugger
            for(let i = 0; i < stars; i++){
                let tr = document.createElement("tr")
                let td = document.createElement("td");
                td.innerHTML = `<div style="font-size: 24px; color:yellow">
                <i class="far fa-star fa-2x"></i>
              </div
                `
                tr.appendChild(td);
                table.appendChild(tr);
            }
            //create currentGame table on right side of screen
            //Points: 50
            // *      * etc.
            //if complete say Won or explosion of stars
        } 

    }
}