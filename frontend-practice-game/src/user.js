class User {

    constructor(username, id, password){
        this.username = username;
        this.password = password;
        this.id = id;
        User.currentUser = this;
    }

    static get clear(){
        User.currentUser = "";
    }

    static get user(){
        return User.currentUser;
    }

    static displayWhoIsPlaying(){
        let h2 = document.querySelector(".put-name-here");
        let user = User.user;
        let token = window.localStorage.userToken;
        let configUser = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3000/users/${user.id}`, configUser)
        .then(response => response.json())
        .then((myjson) => {
            console.log(myjson)        
            let completeGames = 0;
            let incompleteGames = 0;
            
            for(let i = 0; i < myjson.included.length; i++){
                console.log("game:", myjson.included[i])
                if(myjson.included[i].attributes.complete === true){
                    completeGames = completeGames + 1;
                }else if(myjson.included[i].attributes.complete === false){
                    incompleteGames = incompleteGames + 1;
                }
            }
            h2.innerHTML = `
            ${myjson.data.attributes.username} is working on ${incompleteGames} and has Won ${completeGames}!
            `
        })
    }

    static submitLogIn(){
        
        let logInSubmitB = document.getElementById("log-in-submit");
        logInSubmitB.addEventListener("click", function(e){
            e.preventDefault();
            let nameInput = document.getElementById("log-in-name").value;
            let passwordInput = document.getElementById("log-in-password").value;
            let logInObject = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"//,
                    //"Accept": "application/json"                
                },
                body: JSON.stringify({
                    username: nameInput,
                    password: passwordInput
                })
            };
            
            fetch("http://localhost:3000/login", logInObject)
            .then( response => response.json() )//response.json())
            .then( (myjson) => {
                //debugger
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
                    window.localStorage.setItem("userToken", myjson.token)
                    let questionForm = document.querySelector(".question-form");
                    questionForm.setAttribute("game-id", gameId);
                    Game.displayGame();
                    Game.displayUsersGames();
                    OperatorButtons.renderOperatorButtons();
                    User.displayWhoIsPlaying();
                }else if(myjson.errors){
                    let error = myjson.errors.message
                    container.innerHTML = `${error}`
                }
            })
            .catch( function(error){
                //debugger
                console.log('LoginError:', error)
            })
            console.log('not in response');
            
                App.displayLogoutButton();       
        })
    }

    static submitSignUp(){
        console.log("submit sign up");
        let signUpSubmitB = document.getElementById("sign-up-submit");
        if(!!signUpSubmitB){
            console.log('hit submitSignUp');
        signUpSubmitB.addEventListener("click", function(e){
            let nameInput = document.getElementById("sign-up-name");
            let userName = nameInput.value;
            let passwordInput = document.getElementById("sign-up-password");
            let userPassword = passwordInput.value;
            let configurationObject = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    username: userName,
                    password: userPassword
                })
            }
            //post fetch request
            //debugger
            //console.log("headers", configurationObject.headers);
            console.log('configObj', configurationObject)
            fetch("http://localhost:3000/signup", configurationObject)
            .then((response) => {
                console.log('Response:', response)
                return response.json()
            })
            .then((myjson) => {
                console.log('Success:', JSON.stringify(myjson))
                //window.localStorage.setItem('userToken', myjson.token)            
                let user = new User(myjson.user.data.attributes.username, myjson.user.data.attributes.id)

                let incompleteGame = new Game(myjson.user.included[0].attributes.id, myjson.user.included[0].attributes.points, myjson.user.included[0].attributes.stars, myjson.user.included[0].attributes.complete, myjson.user.included[0].attributes.user_id);

                let questionForm = document.querySelector(".question-form");
                questionForm.setAttribute("game-id", incompleteGame.id);
                console.log("user:", user)
                Game.displayGame();
                OperatorButtons.renderOperatorButtons();
                User.displayWhoIsPlaying();
                //testing here
                //Game.displayUsersGames();

            })
            .catch(error => console.log('ThisError:', error))
            App.displayLogoutButton();
            Game.displayUsersGames();
        })
        }
    }

    static clickLogOutButton(){
        let container = document.querySelector(".first-view");
        let logOutButton = document.getElementById("logout-button");
        logOutButton.addEventListener("click", function(e){
            window.localStorage.removeItem("userToken");
            //send logout request to clear sessions
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
            App.run();            
        })
    }

    static fetchCurrentUser(){
        fetch('http://localhost:3000/users/current_user', {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then(myjson => {
            console.log(myjson)
        })
        .catch(error => console.error(error))
    }
        

}

User.currentUser = "";