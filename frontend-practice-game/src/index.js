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

function displayWhoIsPlaying(){
    //select div element with id="who-is-playing" and add text with username and remove hidden class
    //debugger
    let h2 = document.querySelector(".put-name-here");
    //debugger
    let user = JSON.parse(window.localStorage.getItem("currentUser"));
    console.log("user-id:", user.id);
    console.log("url:", configURL)
    let token = window.localStorage.userToken;
    let configUser = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    fetch(`${configURL}users/${user.id}`, configUser)
    .then(response => response.json())
    .then((myjson) => {
        console.log(myjson)
        
        let completeGames = 0;
        let incompleteGames = 0;
        for(game of myjson.included){
            console.log("game:", game)
            if(game.attributes.complete === true){
                completeGames = completeGames + 1;
            }else if(game.attributes.complete === false){
                incompleteGames = incompleteGames + 1;
            }
        }
        h2.innerHTML = `
        ${myjson.data.attributes.username} is working on ${incompleteGames} and has Won ${completeGames}!
        `
    })
    //h2.innerHTML = ` ${user.username} is Playing`
    //container.appendChild(h2);
    //wIPDiv.innerHTML = `
      //  <h2> ${user.username} is Playing </h2>
        //`
    //wIPDiv.removeAttribute(".who-is-playing")   
    //wIPDiv.classList.remove("hidde
}


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



function addEventListenerOnCheck(question){
    let checking = document.querySelector("form");
         checking.addEventListener("submit", function checking(e){
            console.log("Event:", e);
            e.preventDefault();
            let answer = document.querySelector("#user-answer").value;
            let answerField = document.querySelector("#user-answer");
            if(!answerField.classList.contains("green")){
            let check = question.checkAnswer(answer);
            if(check){
                // render answer green
                answerField.classList.add("green");
                // render answer green
                Game.updateCurrentGame(); 
                //listen for change
                answerField.addEventListener("input", function(e){
                    console.log(e, e.target)
                    answerField.classList.remove("green")
                })                
            } else {
                answerField.classList.add("red");
                //render answer red 
                answerField.addEventListener("input", function(e){    
                    answerField.classList.remove("red")   
                }) 
            }       
            }           
           addEventListenerOnPlus();
           addEventListenerOnMinus();
           addEventListenerOnTimes();
           addEventListenerOnDivide();
        })
         let answerField = document.querySelector("#user-answer");
        }

function addEventListenerOnDivide(){
    let dOB = document.getElementById("divide-operator-button");
    dOB.addEventListener("click", function(e){
        let divisionQuestionsArray = DivQuestions.generateDivQuestions();
        let randomNum = Math.floor(Math.random() * divisionQuestionsArray.length);
        let divisionQuestion = divisionQuestionsArray[randomNum]
        console.log("divques:", divisionQuestion)
        divisionQuestion.renderQues();
        let answerField = document.querySelector("#user-answer");   
        addEventListenerOnCheck(divisionQuestion);       
    })
}

function addEventListenerOnPlus(){
    let pOB = document.getElementById("plus-operator-button");
    pOB.addEventListener("click", function(e){
         let num1 = Math.floor(Math.random() * 100) + 1;
         let num2 = Math.floor(Math.random() * 100) + 1;
         let operator = " + ";
         let additionQuestion = new Question(num1, operator, num2);
         additionQuestion.renderQues();
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
    container.innerHTML =   `
        <h2 class="put-name-here"></h2>
        <br>   
        <br>
        <button type="button" id="plus-operator-button"><i class="fas fa-plus"></i></button>
        <button type="button" id="minus-operator-button"><i class="fas fa-minus"></i></button>
        <button type="button" id="times-operator-button"><i class="fas fa-times"></i></button>
        <button type="button" id="divide-operator-button"><i class="fas fa-divide"></i></button>
        <br>
        <br>
        <br>
    `;
    addEventListenerOnPlus();
    addEventListenerOnMinus();
    addEventListenerOnTimes();
    addEventListenerOnDivide();
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
            renderOperatorButtons();
            displayWhoIsPlaying();

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
                renderOperatorButtons();
                displayWhoIsPlaying();// instance method
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
