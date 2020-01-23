let configURL = "http://localhost:3000/"
let signUpURL = `${configURL}signup`
let logInURL = `${configURL}login`
let logOutURL = `${configURL}logout`
let usersURL = `${configURL}users`
let updateGameURL = `${configURL}game`

let container = document.querySelector(".first-view");
let firstViewDiv = document.querySelector("#first-view");

function displayWhoIsPlaying(){
    //select div element with id="who-is-playing" and add text with username and remove hidden class
    let h2 = document.querySelector(".put-name-here");
    let user = JSON.parse(window.localStorage.currentUser)
    h2.innerHTML = ` ${user.username} is Playing`
    //container.appendChild(h2);
    //wIPDiv.innerHTML = `
      //  <h2> ${user.username} is Playing </h2>
        //`
    //wIPDiv.removeAttribute(".who-is-playing")   
    //wIPDiv.classList.remove("hidden")
}



function clickLogOutButton(){
    let logOutButton = document.getElementById("logout-button");
    logOutButton.addEventListener("click", function(e){
        //e.preventDefault();
        window.localStorage.removeItem("userToken");
        window.localStorage.removeItem("currentUser");
        window.localStorage.removeItem("currentGame");
        container.innerHTML = `
        <div id="first-view">
            <h3>Practice Equations For Fun!</h3>
            <h2 class="hidden" id="who-is-playing">    
            </h2>
            <button type="button" id="log-in-1">Log In</button>
            <p><em>or</em></p>
            <button type="button" id="sign-up-1">Sign Up</button>
        </div>
        `
        document.querySelector(".current-game").classList.add("hidden");
        document.querySelector(".users-games").classList.add("hidden");
        logOutButton.classList.add("hidden");
        document.querySelector(".question-form").classList.add("hidden");
        //needs first page functionality without refreshing page
        clickLogIn();
        clickSignUp();
    })
}

function updateCurrentGame(answerField){
    let cg = window.localStorage.currentGame
    console.log("current game:", cg);
    console.log("parsed game:", JSON.parse(cg))
    let cGame = JSON.parse(cg)
    let id = cGame.id;
    let points = cGame.points;
    points += 1;
    //increment points by one
    let stars = cGame.stars;
    stars = Math.floor(points/10);
    //update stars;
    let complete = cGame.complete;
    if(points== 100){
        complete = true;
    }
    let userId = cGame.userId;
    let game = new Game(id, points, stars, complete, userId)
    window.localStorage.setItem("currentGame", JSON.stringify(game))
    //let newPoints = points + 1
    //stars = Math.floor(newPoints/10)
    //can it be update?
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
        fetch(updateGameURL, updateGameConfig)
        .then( (response) => response.json() )
        .then((myJson) => console.log("Success:", myJson))
        .catch((error) => console.error("Error:", error))
        //send fetch request and update localStorage.currentGame
        //update points and stars on right column
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
            td.innerHTML = `<div style="font-size: 48px; color:yellow">
            <i class="far fas star fa-2x"></i>
            <i class="far fa-star"></i></div>

            `
            if(!!complete){
                container.innerHTML = "";
                container.innerHTML = `
                <h4>Congratulations!  You Won!! </h4>
                `
                //option to play a new game
            }

        }
}

function addEventListenerOnCheck(question){
    let check = document.querySelector("form");

    //let answerField = document.querySelector("user-answer")
    //if(!answerField.classList.contains("green")){
         check.addEventListener("submit", function(e){
             console.log("Event:", e);
             //debugger
             //console.log( e.target)
             e.preventDefault();
             let answer = document.querySelector("#user-answer").value;
             //let answerField = document.querySelector("#user-answer");
             //debugger
             //console.log(e.target["#user-answer"].value);
             let check = question.checkAnswer(answer);
             if(check){
                 // render answer green
                 let answerField = document.querySelector("#user-answer");
                 answerField.classList.add("green");
                 // render answer green
                 //find currentGame
                 //debugger
                 updateCurrentGame();                 
             } else {
                 answerField.classList.add("red");
                 //render answer red                
             }
            
             //if  new Game(JSON.parse(window.localStorage.currentGame)) game.complete === false {}
            addEventListenerOnPlus();
            addEventListenerOnMinus();
            addEventListenerOnTimes();
            addEventListenerOnDivide();
         })
        }
//}

function addEventListenerOnDivide(){
    let dOB = document.getElementById("divide-operator-button");
    dOB.addEventListener("click", function(e){
        //debugger
        let divisionQuestionsArray = DivQuestions.generateDivQuestions();
        let randomNum = Math.floor(Math.random() * divisionQuestionsArray.length);
        let divisionQuestion = divisionQuestionsArray[randomNum]
        console.log("divques:", divisionQuestion)
        divisionQuestion.renderQues();
        let answerField = document.querySelector("#user-answer");
        //debugger    
        addEventListenerOnCheck(divisionQuestion);       
    })

}

function addEventListenerOnPlus(){
    let pOB = document.getElementById("plus-operator-button");
    pOB.addEventListener("click", function(e){
        //let fN = Math.float(random(0) + 1);
         let num1 = Math.floor(Math.random() * 100) + 1;
         let num2 = Math.floor(Math.random() * 100) + 1;
         let operator = " + ";
         let additionQuestion = new Question(num1, operator, num2);
         additionQuestion.renderQues();
         //debugger
         addEventListenerOnCheck(additionQuestion);
    })

}

function addEventListenerOnMinus(){
    let mOB = document.getElementById("minus-operator-button");
    mOB.addEventListener("click", function(e){
        let num1 = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * num1) + 1;
        let operator = " - ";
        let minusQuestion = new Question(num1, operator, num2)
        minusQuestion.renderQues();
        addEventListenerOnCheck(minusQuestion);
    });
}

function addEventListenerOnTimes(){
    let tOB = document.getElementById("times-operator-button");
    tOB.addEventListener("click", function(e){
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let operator = " * ";
        let timesQuestion = new Question(num1, operator, num2);
        timesQuestion.renderQues();
        addEventListenerOnCheck(timesQuestion)
    })
}

function renderOperatorButtons(){
   // let container = document.querySelector(".first-view");
    //container.innerHTML = "";
    //debugger
    //let u = JSON.parse(window.localStorage.currentUser)
    //why does it sometimes work and sometimes not?
    container.innerHTML =   `
        <h2 class="put-name-here"></h2>
        <br>
    
        <br>
        <button type="button" id="plus-operator-button">+</button>
        <button type="button" id="minus-operator-button">-</button>
        <button type="button" id="times-operator-button">*</button>
        <button type="button" id="divide-operator-button">/</button>
        <br>
        <br>
        <br>
    `;
    addEventListenerOnPlus();
    addEventListenerOnMinus();
    addEventListenerOnTimes();
    addEventListenerOnDivide();

}

//remove hidden class on logout button.
//put an eventlistener on logout button that will send a delete request
//how do I keep track of current user? and submit userToken with fetch?
function displayLogoutButton(){
    let logoutButton = document.getElementById("logout-button");
    logoutButton.classList.remove("hidden");
    clickLogOutButton(); 
}



function displayUsersGames(){
    let userToken = window.localStorage.getItem('userToken');
    fetch(usersURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        }
    })
    //send with Authorization[:header] = `bearer, ${token}`
    .then(function(response){ return response.json()})
    .then(function(myjson){ 
        console.log("userGames", myjson)
        let usersGamesDiv = document.querySelector(".users-games");
        let table = document.createElement("table");
        usersGamesDiv.appendChild(table);
        for(let user of myjson){
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${user}<td>`
            table.appendChild(tr);
        }
        //let values = Object.values(myjson);
        //for(let v of values){
            //let li = document.createElement("li");
            //li.innerHTML = `${v} game/s complete`
        //}
    //create ul and append it to log out container
    //create li element for each user and give it the innerHTML of user: numm games complete
    })
    .catch((error) => console.error("Error:", error))
}

function submitSignUp(){
    let signUpSubmitB = document.getElementById("sign-up-submit");
    //debugger
    if(!!signUpSubmitB){
        //debugger
    signUpSubmitB.addEventListener("click", function(e){
        //debugger
        //create configurationObject 
        let nameInput = document.getElementById("sign-up-name");
        let userName = nameInput.value;
        //debugger
        let passwordInput = document.getElementById("sign-up-password");
        let userPassword = passwordInput.value;
        //let user = new User(userName, userPassword)
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                //"Accept": "application/json"
              },
            body: JSON.stringify({
                username: userName,
                password: userPassword
              })
        }
        //debugger
        //post fetch request
        fetch(signUpURL, configurationObject)
        .then((response) => {
            
            //debugger
            console.log('Response:', response)
            return response.json()
        })
        .then((myjson) => {
            //debugger
            console.log('Success:', JSON.stringify(myjson))
            window.localStorage.setItem('userToken', myjson.token)
            
            let user = new User(myjson.user.data.attributes.username, myjson.user.data.attributes.id)
            //debugger
            let incompleteGame = new Game(myjson.user.included[0].attributes.id, myjson.user.included[0].attributes.points, myjson.user.included[0].attributes.stars, myjson.user.included[0].attributes.complete, myjson.user.included[0].attributes.user_id)
            //debugger
            window.localStorage.setItem('currentGame', JSON.stringify(incompleteGame));
            window.localStorage.setItem('currentUser', JSON.stringify(user))

            //debugger
            //document.querySelector(".first-view").innerHTML = "";
            //displayWhoIsPlaying(user);
            //renderOperatorButtons();

            //get the data of the user. create new user with the username, id attributes and new game with points, stars, status and id attributes
            //set token with in window.localStorage to  myjson.data.token
            //window.localStorage.setItem(myjson.data.token)
            //render game info on right panel
            //render username
            console.log("user:", user)
            Game.displayGame();
            
            displayWhoIsPlaying();
        })
        .catch(error => console.error('Error:', error))

        let firstViewDiv = document.querySelector("#first-view");
        firstViewDiv.classList.add("hidden");
        //user.id, user.username, incomplete_game.points, incomplete_games.stars, incomplete_game.id, incomplete_game.complete, incomplete_game.user_id
        //token

        //console.log("user:", user)


        //console.log(userName);
        //document.querySelector(".first-view").innerHTML = ""
        renderOperatorButtons();
        //render log out button 
        displayLogoutButton();

        displayUsersGames();

        //Game.displayGame();
        
    })
    }
}

function submitLogIn(){
    let logInSubmitB = document.getElementById("log-in-submit");
    logInSubmitB.addEventListener("click", function(e){
        //debugger
        //pass in e or not
        let nameInput = document.getElementById("log-in-name").value;
        let passwordInput = document.getElementById("log-in-password").value;


        let logInObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                
            },
            body: JSON.stringify({
                username: nameInput,
                password: passwordInput
            })
        };
        e.preventDefault();
        //debugger

        fetch(logInURL, logInObject)
        .then( response => response.json())
        .then( function(myjson){
            console.log("Success: ", myjson)
            //create new user or find user with username and user id from myjson object
            let game = myjson.game.data.attributes;
            let gameId = game.id;
            let gameComplete = game.complete;
            let gamePoints = game.points;
            let gameStars = game.stars;
            let gameUserId = game.user_id
            let ng = new Game(gameId, gamePoints, gameStars, gameComplete, gameUserId);
            let user = myjson.user.data.attributes;
            let userId = user.id;
            let username = user.username;
            let nu = new User(username, userId)
            window.localStorage.setItem("userToken", myjson.token)
            window.localStorage.setItem("currentUser", JSON.stringify(nu));
            window.localStorage.setItem("currentGame", JSON.stringify(ng));
            console.log()
            //user = new User(myjson.data)
            //create new game or find game with id, points, stars, complete, user_id
            
            Game.displayGame();
            displayWhoIsPlaying();
            displayUsersGames();

        })
        .catch( function(error){
            console.error('Error:', error)
        })
        renderOperatorButtons();
        displayLogoutButton();
        //displayUsersGames();
       
    })
 }

function clickLogIn (){
    let logInButton = document.getElementById("log-in-1");
    logInButton.addEventListener("click", function(e){
        console.log(e);
        //firstViewDiv.classList.add("hidden");
        //let logInDiv = document.createElement("div");
        //logInDiv.classList.add("form");
        container.innerHTML = `<form id="log-in-form">Name:<br>
        <input type="text" name="name" id="log-in-name"><br>
        password: <br>
        <input type="text" name="password" id="log-in-password"><br>
        <input type="submit" id="log-in-submit" value="Submit">
        </form>`
        //container.appendChild(logInDiv);
        submitLogIn();
    })
}

function clickSignUp(){
    let signUpButton = document.getElementById("sign-up-1");
    signUpButton.addEventListener("click", function(e){
        console.log(e);
        //firstViewDiv.classList.add("hidden");
        //let signUpDiv = document.createElement("div");
        //signUpDiv.classList.add("form");
        container.innerHTML = `<form id="sign-up-form">Name:<br>
        <input type="text" name="name" id="sign-up-name"><br>
        password: <br>
        <input type="text" name="password" id="sign-up-password"><br>
        <input type="submit" id="sign-up-submit" value="Submit">
        </form>`
        //container.appendChild(signUpDiv);
        submitSignUp();
        
    })

}

//window.localStorage.setItem('token')
//passed through header authorization: token



clickLogIn();
clickSignUp()
