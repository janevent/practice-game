class Game {

    constructor(id, points, stars, complete, userId){
        this.id = id,
        this.points = points,
        this.stars = stars,
        this.complete = complete,      
        this.userId = userId
        this.save;        
    }

    get save(){
        Game.allgames.push(this)
    }

    static find(){
        //let user = JSON.parse(window.localStorage.currentUser);
        let questionForm = document.querySelector(".question-form");
        let gameId = questionForm.getAttribute("game-id");
        return Game.allgames.find(function(game){
            return game.id === parseInt(gameId);
        })
    }

    static get clear(){
        Game.allgames = [];
    }

    static displayGame(){
        //let game = JSON.parse(window.localStorage.currentGame);
        let game = Game.find();
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
        } 
    }

    static updateCurrentGame(){
        let game = Game.find();
        let id = game.id;
        let points = game.points;
        points += 1;
        game.points = points;
        //increment points by one
        let stars = game.stars;
        stars = Math.floor(points/10);
        game.stars = stars;
        //update stars;
        let complete = game.complete;
        if(points== 100){
            complete = true;
        }
        game.complete = complete;
        let userId = game.userId;
        window.localStorage.setItem("currentGame", JSON.stringify(game))
        let token = window.localStorage.userToken

        let updateGameConfig = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                id: id,
                points: points,
                stars: stars,
                complete: complete,
                user_id: userId
            })
        }
        fetch("http://localhost:3000/game", updateGameConfig)
        .then( (response) => response.json() )
        .then((myJson) => console.log("Success:", myJson))
        .catch((error) => console.error("Error:", error))
            
        let gameDiv = document.querySelector(".current-game");
        gameDiv.innerHTML = `
            <h3>Points: ${points}</h3>
            <table class="current-game-table"></table>                 
        `
    
        for(let i = 0; i < stars; i++){
            let td = document.createElement("td");
            let tr = document.createElement("tr");
            tr.appendChild(td);
            let table = document.querySelector(".current-game-table");
            table.appendChild(tr);
            td.innerHTML = `
                <div style="font-size: 48px; color:yellow">
                <i class="far fas star fa-2x"></i>
                <i class="far fa-star"></i></div>
            `
    
            if(!!complete){
                let user = JSON.parse(window.localStorage.currentUser)
                container.innerHTML = "";
                container.innerHTML = `
                    <h1>Congratulations ${user.username}!! You Won!! </h1>
                    <br>
                    <br>
                `
    
                let questionForm = document.querySelector(".question-form");
                questionForm.classList.add("hidden");
                let ug = document.querySelector(".users-games");
                ug.classList.add("hidden");
                let cg = document.querySelector(".current-game");
                cg.classList.add("hidden");
            }
        }
    }

    static displayUsersGames(){
        let userToken = window.localStorage.getItem('userToken');
        fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })
        .then(function(response){ return response.json()})
        .then(function(myjson){ 
            console.log("userGames", myjson)
            let usersGamesDiv = document.querySelector(".users-games");        
            let table = document.createElement("table");
            usersGamesDiv.appendChild(table);
            for(let user of myjson){
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${user} game/s won<td>`
                table.appendChild(tr);
            }
        })
        .catch((error) => console.error("Error:", error))
    }
     
}

Game.allgames = [];