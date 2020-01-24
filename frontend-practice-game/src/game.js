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

    static clickNewGameButton(){
        let newGameButton = document.getElementById("new-game");
        newGameButton.addEventListener("click", function(e){
            console.log("Event", event);
            let user = JSON.parse(window.localStorage.currentUser)
            newGameConfiguration = {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer, 
                    4{window.localStorage.userToken}`
                },
                body: JSON.stringify({
                    points: 0,
                    stars: 0,
                    complete: false,
                    user_id: user.id
                })
            }
            fetch(newGameURL, newGameConfiguration)
            .then(response => response.json())
            .then(function(myjson){
                console.log("Success:", myjson)
                let currentGame = myjson.data.game.attributes//?
                let newGame = new Game(currentGame.id, currentGame.points, currentGame.stars, currentGame.complete, currentGame.userId )
                window.localStorage.setItem("currentGame", JSON.stringify(newGame))
                Game.displayGame();
                displayWhoIsPlaying();
                displayUsersGames();

            })
            .catch(error => console.error("Error:", error))
            renderOperatorButtons();
            displayLogoutButton();
        })
    }
}