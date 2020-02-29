function app(){
let configURL = "http://localhost:3000/"
let signUpURL = `${configURL}signup`
let logInURL = `${configURL}login`
let logOutURL = `${configURL}logout`
let usersURL = `${configURL}users`
let updateGameURL = `${configURL}game`
let newGameURL = `${configURL}games/new`

let container = document.querySelector(".first-view");
let firstViewDiv = document.querySelector("#first-view");



function clickLogOutButton(){
    let logOutButton = document.getElementById("logout-button");
    logOutButton.addEventListener("click", function(e){
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
        document.querySelector(".current-game").innerHTML = " ";
        document.querySelector(".users-games").innerHTML = " ";
        logOutButton.classList.add("hidden");
        let qf = document.querySelector(".question-form")
        qf.innerHTML = " ";
        qf.removeAttribute("game-id");
        Game.clear;
        User.clear;
        app();
    })
}




function displayLogoutButton(){
    let logoutButton = document.getElementById("logout-button");
    logoutButton.classList.remove("hidden");
    clickLogOutButton(); 
}

function submitSignUp(){
    let signUpSubmitB = document.getElementById("sign-up-submit");
    if(!!signUpSubmitB){
        //debugger
    signUpSubmitB.addEventListener("click", function(e){
        //create configurationObject 
        let nameInput = document.getElementById("sign-up-name");
        let userName = nameInput.value;
        let passwordInput = document.getElementById("sign-up-password");
        let userPassword = passwordInput.value;
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                username: userName,
                password: userPassword
              })
        }

        //post fetch request
        fetch(signUpURL, configurationObject)
        .then((response) => {
            console.log('Response:', response)
            return response.json()
        })
        .then((myjson) => {
            console.log('Success:', JSON.stringify(myjson))
            window.localStorage.setItem('userToken', myjson.token)            
            let user = new User(myjson.user.data.attributes.username, myjson.user.data.attributes.id)

            let incompleteGame = new Game(myjson.user.included[0].attributes.id, myjson.user.included[0].attributes.points, myjson.user.included[0].attributes.stars, myjson.user.included[0].attributes.complete, myjson.user.included[0].attributes.user_id);

            let questionForm = document.querySelector(".question-form");
            questionForm.setAttribute("game-id", incompleteGame.id);

            window.localStorage.setItem('currentGame', JSON.stringify(incompleteGame));
            window.localStorage.setItem('currentUser', JSON.stringify(user))
            //get the data of the user. create new user with the username, id attributes and new game with points, stars, status and id attributes
            console.log("user:", user)
            Game.displayGame();
            OperatorButtons.renderOperatorButtons();
            User.displayWhoIsPlaying();

        })
        .catch(error => console.error('Error:', error))

        //renderOperatorButtons(); 
        displayLogoutButton();
        Game.displayUsersGames();
    })
    }
}

function submitLogIn(){
    let logInSubmitB = document.getElementById("log-in-submit");
    logInSubmitB.addEventListener("click", function(e){
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
        fetch(logInURL, logInObject)
        .then( response => response.json())
        .then( function(myjson){
            console.log("Success: ", myjson)
            if(myjson.user){
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

                //debugger

                window.localStorage.setItem("userToken", myjson.token)
                let questionForm = document.querySelector(".question-form");
                questionForm.setAttribute("game-id", gameId);

                window.localStorage.setItem("currentUser", JSON.stringify(nu));
                window.localStorage.setItem("currentGame", JSON.stringify(ng));
                Game.displayGame();//change to not static and use the instance of game
                Game.displayUsersGames();
                OperatorButtons.renderOperatorButtons();
                User.displayWhoIsPlaying();// instance method
            }else if(myjson.errors){
                let error = myjson.errors.message
                container.innerHTML = `${error}`
            }

        })
        .catch( function(error){
            console.error('Error:', error)
        })
            //renderOperatorButtons();
            displayLogoutButton();       
    })
 }

function clickLogIn (){
    let logInButton = document.getElementById("log-in-1");
    logInButton.addEventListener("click", function(e){
        console.log(e);
        container.innerHTML = `<form id="log-in-form">Name:<br>
        <input type="text" name="name" id="log-in-name"><br>
        password: <br>
        <input type="text" name="password" id="log-in-password"><br>
        <br>
        <input type="submit" id="log-in-submit" value="Submit">
        </form>`
        //debugger
        submitLogIn();
    })
}

function clickSignUp(){
    let signUpButton = document.getElementById("sign-up-1");
    signUpButton.addEventListener("click", function(e){
        console.log(e);
        container.innerHTML = `<form id="sign-up-form">Name:<br>
        <input type="text" name="name" id="sign-up-name"><br>
        password: <br>
        <input type="text" name="password" id="sign-up-password"><br>
        <br>
        <input type="submit" id="sign-up-submit" value="Submit">
        </form>`
        submitSignUp();       
    })
}

clickLogIn();
clickSignUp();
}

app();
